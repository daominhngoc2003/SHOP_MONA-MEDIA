import { CartContext } from "../../provider/CartReducer";
import { useContext, useEffect } from "react";
import "./bill.scss"
import { GetCartByUser } from "../../api/Cart";
import { useNavigate } from "react-router-dom";
import { CheckOut } from "../../api/Bill";
import { useForm } from "react-hook-form";
const BillPage = () => {
    const { state: carts, dispatch } = useContext(CartContext);

    // state
    const { register, handleSubmit, formState: { errors }, reset } = useForm<any>();
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("user") || '{}');
    const user = token.user;
    const userId = user._id
    const cart = carts?.carts;
    const productList = cart.products;
    useEffect(() => {
        reset(user)
    }, [reset])

    useEffect(() => {
        const fetCart = async () => {
            try {
                const { data } = await GetCartByUser(user._id);
                dispatch({ type: "cart/getCartByUser", payload: data.data })
            } catch (error) {
                console.log(error);
            }
        }
        fetCart();
    }, [dispatch])

    // hàm checkout
    const onCheckOut = async (user: any) => {
        const formCheckout = {
            userId: userId,
            phone: user.user_phone,
            shippingAddress: user.user_address,
            paymentMethod: 'a',
        }
        const data = await CheckOut(formCheckout)
        await dispatch({ type: "bill/checkout", payload: data.data })
        alert("Đặt hàng thành công");
        navigate("/bills/detail")
    }
    return (
        <div>
            {/* <section className="wrapper-order">
                <div className="order-detail">
                    <h1 className="order-title">Chi tiết đơn hàng</h1>
                    <div className="flex-header">
                        <b>SẢN PHẨM</b>
                        <b>TỔNG</b>
                    </div>
                    <div className="flex">
                        <div className="flex-d">
                            <p>Bom mỹ </p>
                            <p>× 1</p>
                        </div>
                        <b>180.000 đ</b>
                    </div>
                    <div className="flex">
                        <b>Phương thức thanh toán:</b>
                        <p>Chuyển khoản ngân hàng</p>
                    </div>
                    <div className="flex">
                        <b>Tổng cộng:</b>
                        <b>180.000₫</b>
                    </div>
                </div>

                <div className="bill-cart">
                    <h1 className="bill-title">Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</h1>
                    <ul>
                        <li>
                            <p>Mã đơn hàng:</p>
                            <b>632</b>
                        </li>
                        <li>
                            <p>Trạng thái đơn hàng:</p>
                            <b>Đang vận chuyển</b>
                        </li>
                        <li>
                            <p>Ngày:</p>
                            <b>29/06/2023</b>
                        </li>
                        <li>
                            <p>Tổng cộng:</p>
                            <b>180.000₫</b>
                        </li>
                        <li>
                            <p>Phương thức thanh toán:</p>
                            <b>Chuyển khoản ngân hàng</b>
                        </li>
                    </ul>
                </div>
            </section> */}
            <section className="bill-wrapper containner wrapper-order">
                <form
                    onSubmit={handleSubmit(onCheckOut)}
                    className="grid grid-cols-2">
                    <div className="bill-user-address col-1 grid">
                        <div>
                            <h1>Thông tin giao hàng</h1>
                            <form className="bill-user-form">
                                <div>
                                    <input
                                        type="text"
                                        value={user?.user_email}
                                        {...register("user_email", { required: "Email là bắt buộc" })}
                                        placeholder="Email"
                                        disabled />
                                    <div>{errors?.user_email?.message as any}</div>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        defaultValue={user?.user_fullName}
                                        placeholder="Họ và tên"
                                        {...register("user_fullName", { required: "Họ và tên là bắt buộc" })} />
                                    <div>{errors?.user_fullName?.message as any}</div>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        defaultValue={user?.user_phone}
                                        {...register("user_phone", { required: "Số điện thoại là bắt buộc" })}
                                        placeholder="Số điện thoại" />
                                    <div>{errors?.user_phone?.message as any}</div>
                                </div>
                                <div>
                                    <input
                                        defaultValue={user?.user_address}
                                        {...register("user_address", { required: "Địa chỉ là bắt buộc" })}
                                        type="text"
                                        placeholder="Địa chỉ" />
                                    <div>{errors?.user_address?.message as any}</div>
                                </div>
                            </form>
                        </div>
                        <div className="paymemtMethod">
                            <h1>Phương thức thanh toán</h1>
                            <div>
                                <div className="w-full">
                                    <span>Thanh toán khi giao hàng</span>
                                </div>
                                <div className="w-full">
                                    <span>Thanh toán online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-detail col-2">
                        <h1 className="order-title">Chi tiết đơn hàng</h1>
                        <div className="flex-header">
                            <b>SẢN PHẨM</b>
                            <b>TỔNG</b>
                        </div>
                        {productList?.map((pro: any) => (
                            <div className="flex" key={pro._id}>
                                <div className="flex-d">
                                    <p>{pro?.productId.product_name}</p>
                                    <p> x{pro?.quantity}</p>
                                </div>
                                <b>{pro?.price} đ</b>

                            </div>
                        ))}
                        {/* <div className="flex">
                            <b>Phương thức thanh toán:</b>
                            <p>Chuyển khoản ngân hàng</p>
                        </div> */}
                        <div className="flex">
                            <b>Phí vận chuyển:</b>
                            <p>{cart?.shippingFee} đ</p>
                        </div>
                        <div className="flex">
                            <b>Tổng cộng:</b>
                            <b>{cart?.totalOrder} đ</b>
                        </div>
                        <div className="bill-save">
                            <button>Đặt hàng</button>
                        </div>
                    </div>
                </form>
            </section>

        </div>
    )
}

export default BillPage