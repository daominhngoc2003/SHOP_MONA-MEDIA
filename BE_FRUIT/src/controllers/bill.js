import Bill from "../models/bill";
import Cart from "../models/cart";
import User from "../models/user";

export const checkOut = async (req, res) => {
  const { shippingAddress, userId, paymentMethod, orderNotes, phone } =
    req.body;
  try {
    if (!shippingAddress || !paymentMethod || !phone) {
      return res.status(400).json({ message: "Bạn cần nhập đủ thông tin!" });
    }
    // Tìm kiếm giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId: userId }).populate(
      "products.productId"
    );

    // Nếu không tìm thấy giỏ hàng, trả về lỗi
    if (!cart || cart.products.length === 0) {
      return res
        .status(400)
        .json({ message: "Trong giỏ hàng không có sản phẩm nào!" });
    }

    // Lấy thông tin user
    const user = await User.findById(userId);

    // Tạo bill
    const bill = await Bill.create({
      userId: userId,
      cartId: cart._id,
      fullName: user.user_fullName,
      totalPrice: cart.totalPrice,
      phone: user.user_phone || phone,
      shippingFee: cart.shippingFee,
      shippingAddress: user.address || shippingAddress,
      totalOrder: cart.totalOrder,
      paymentMethod: paymentMethod,
      orderNotes: orderNotes,
      products: cart.products,
    });
    // Populate thông tin từ bảng User và Cart
    await bill.populate("userId");

    // Sau khi đã tạo bill, cập nhật trạng thái giỏ hàng và xóa giỏ hàng
    cart.totalPrice = 0;
    cart.totalOrder = 0;
    cart.products = [];
    await cart.save();

    //Sau khi tạo bill xong, thêm luôn id của bill đó vào mảng bills của User
    user.bills.push({
      billId: bill._id,
    });

    await user.save();

    return res.status(200).json({ message: "Đặt hàng thành công!", bill });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const SearchBill = async (req, res) => {
  const {
    _page = 1,
    _sort = "createAt",
    _limit = 10,
    _order = "asc",
    _keywords = "",
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? 1 : -1,
    },
  };

  try {
    // search
    const searchData = (bills) => {
      return bills?.docs?.filter((item) =>
        item.category_name?.toLowerCase().includes(_keywords)
      );
    };
    // const query = {};
    // if (_keywords) {
    //   query.$text = { $search: _keywords };
    // }

    const bills = await Category.paginate({}, options);
    if (!bills.docs || bills.docs.length === 0) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }

    const searchDataBill = await searchData(bills);
    const billResponse = await { ...bills, docs: searchDataBill };
    // console.log(categoryResponse);

    return res.json({
      message: "Lấy danh mục thành công",
      // bills,
      bills: billResponse,
      pagination: {
        currentPage: bills.page,
        totalPages: bills.totalPages,
        totalItems: bills.totalDocs,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL BILL
export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({})
      .populate("products.productId")
      .populate("userId");

    if (bills.length === 0) {
      return res.status(400).json({
        message: "Không có hóa đơn nào!",
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách hóa đơn thành công!",
      bills,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET BILL BY USER
export const getBillByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const bills = await Bill.find({ userId })
      .populate("products.productId")
      .populate("userId");
    if (bills.length === 0) {
      return res.status(400).json({
        message: "Không có hóa đơn nào!",
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách hóa đơn thành công!",
      bills,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE BILL
export const getOneBill = async (req, res) => {
  const { billId } = req.params;
  try {
    const bill = await Bill.findById(billId)
      .populate("products.productId")
      .populate("userId");

    if (!bill) {
      return res.status(400).json({
        message: "Không tìm thấy hóa đơn!",
      });
    }

    return res.status(200).json({
      message: "Lấy hóa đơn thành công!",
      bill,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE BILL
export const deleteBillById = async (req, res) => {
  const { id } = req.params;
  try {
    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(400).json({
        message: "Không tìm thấy hóa đơn!",
      });
    }

    if (bill.status === "Delivering" || bill.status === "Delivered") {
      return res.status(400).json({
        message: "Không thể xóa hóa đơn đang trong quá trình vận chuyển!",
      });
    }

    await Bill.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Xóa hóa đơn thành công!",
      bill,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS BILL
export const updateBill = async (req, res) => {
  const { billId } = req.params;
  const { status, paymentStatus } = req.body;
  try {
    // Tìm kiếm bill cần cập nhật
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(400).json({
        message: "Không tìm thấy hóa đơn!",
      });
    }

    if (status) {
      bill.status = status;
    }

    if (paymentStatus) {
      bill.paymentStatus = paymentStatus;
    }
    if (status === "Delivered") {
      bill.paymentStatus = "Paid";
    }

    await bill.save();

    res
      .status(200)
      .json({ message: "Hóa đơn đã được cập nhật thành công!", bill });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
