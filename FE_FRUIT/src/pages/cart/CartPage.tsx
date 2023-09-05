import { Link } from "react-router-dom";
import { DeleteAllProductCart, DeleteProductCart, GetCartByUser, UpdateProductCart } from "../../api/Cart";
import { CartContext } from "../../provider/CartReducer";
import "./Cart.scss"
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
const CartPage = () => {
    const { state: carts, dispatch } = useContext(CartContext);
    const token = JSON.parse(localStorage.getItem("user") || '{}');
    const user = token.user;
    const cart = carts?.carts;

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
    }, [])
    const onHandleDeleteAll = async () => {
        try {
            const { data } = await DeleteAllProductCart(user?._id);
            window.location.reload();
            toast.success(data.message)
        } catch (error) {
            console.log(error);
        }
    }

    const increase = async (cart: any) => {
        const quantity = cart.quantity + 1;
        const cartUpdate: any = {
            quantity,
            productId: cart.productId._id,
            userId: user._id,
        }
        try {
            if (user) {
                await UpdateProductCart(cartUpdate)
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const decrease = async (cart: any) => {
        const quantity = cart.quantity - 1;
        const cartUpdate: any = {
            quantity,
            productId: cart.productId._id,
            userId: user._id,
        }
        try {

            if (quantity < 1) {
                const confirm = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng ?");
                const formRemove = {
                    productId: cart.productId._id,
                    userId: user._id
                }
                if (confirm) {
                    await dispatch(DeleteProductCart(formRemove));
                    window.location.reload();
                }
                cart.quantity = 1;
            }

            await UpdateProductCart(cartUpdate);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <section className="wrapper-cart">
                <div className="cart-list">
                    <table>
                        <thead className="box">
                            <tr>
                                <td className="col-name">SẢN PHẨM</td>
                                <td className="col-price">GIÁ</td>
                                <td className="col-quantity">SỐ LƯỢNG</td>
                                <td className="col-total">TỔNG</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.products?.map((pro: any, index: string) => {
                                return (
                                    <tr key={index}>
                                        <td className="col-name">
                                            <div><button>x</button></div>
                                            <div className="cart-image">
                                                <img src={pro?.productId?.product_images?.url}
                                                    alt="image" />
                                            </div>
                                            <div className="cart-name">
                                                <Link to="#">{pro?.productId?.product_name}</Link>
                                            </div>
                                        </td>
                                        <td className="col-price">{pro?.productId?.product_price} đ</td>
                                        <td className="col-quantity">
                                            <div className="cart-quantity">
                                                <button onClick={() => decrease(pro)}>-</button>
                                                <span>{pro?.quantity}</span>
                                                <button onClick={() => increase(pro)}>+</button>
                                            </div>
                                        </td>
                                        <td className="col-total">{pro?.price} đ</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="update-cart">
                        <Link className="continue-cart" to="/products">TIẾP TỤC XEM SẢN PHẨM</Link>
                        <button className="btn-delete-cart" onClick={() => onHandleDeleteAll()}>XÓA TẤT CẢ GIỎ HÀNG</button>
                    </div>
                </div>
                <div className="checkout-cart">
                    <div className="box-header">
                        <h1>TỔNG SỐ LƯỢNG</h1>
                    </div>
                    <div className="box-content">
                        <div className="cart-total">
                            <p>Tổng phụ</p>
                            <span className="price">{cart?.totalPrice || 0} đ</span>
                        </div>
                    </div>
                    <div className="box-footer">
                        <div className="checkout-button">
                            <Link to="/bills">TIẾN HÀNH THANH TOÁN</Link>
                        </div>
                        <form action="" className="checkout_coupon">
                            <div className="checkout_coupon_title">
                                <p>Phiếu ưu đãi</p>
                            </div>
                            <div className="coupon">
                                <input className="input-coupon" type="text" name="coupon_code" placeholder="Mã ưu đãi" />
                                <input className="button-coupon" type="submit" name="apply_couppon" value="Áp dụng" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CartPage