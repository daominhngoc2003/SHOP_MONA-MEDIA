import { Tabs } from 'antd';
import { useEffect, useState, useContext } from "react";

import "./Product-detail.scss"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../provider/ProductProvider';
// import { ICategory } from '../../types/Category';
import { getProductById } from '../../api/Product';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../provider/CartReducer';
import { AddToCart } from '../../api/Cart';
import { toast } from 'react-toastify';
import { IProduct } from '../../types/Product';


const ProductDetail = () => {
    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = useState('description');
    const { state: products, dispatch } = useContext(ProductContext);
    // const [categories] = useState<ICategory[]>([]);
    const { handleSubmit } = useForm();
    const { dispatch: dispatchCart } = useContext(CartContext);
    const product = products.products;

    const token = JSON.parse(localStorage.getItem("user") || '{}');
    const user = token?.user;
    const _id = user?._id;
    const [count, setCount] = useState(1);


    const navigate = useNavigate();
    // LẤY RA ID
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProductById(slug as string);
                if (data) {
                    dispatch({ type: "product/getDetail", payload: data.product })
                }
            } catch (error: any) {
                console.log(error);
            }
        }
        fetchProduct();
    }, [slug])

    const increase = () => {
        setCount((count) => count + 1)
    }

    const decrease = () => {
        setCount((count) => count - 1)
    }

    const onaddToCart = async () => {
        if (user) {
            try {
                const formCart = {
                    productId: slug,
                    quantity: count,
                    userId: _id
                }
                const { data } = await AddToCart(formCart);
                toast.success(data.message)
                await dispatchCart({ type: "cart/addToCart", payload: data.cart });
                navigate("/cart")

            } catch (error: any) {
                console.log(error);
            }
        } else {
            alert("Bạn chưa đăng nhập")
        }
    }


    const handleTabChange = (key: any) => {
        setActiveTab(key);
    };

    return (
        <div>
            <section className="product-section">
                <div className="product-wrapper">
                    <div className="product-grid">
                        <div className="product-image">
                            <a href="">
                                <img src={product?.product_images?.url}
                                    alt="" />
                            </a>
                        </div>
                        <div className="product-content">

                            <div className="product-name">
                                <h1>{product?.product_name}</h1>
                                <div className="product-view">
                                    <p>( {product?.product_view_count} lượt xem)</p>
                                </div>
                            </div>
                            <div className="product-Evaluate">
                                <p><i className="fa-solid fa-star"></i>10 </p>
                            </div>
                            <div className="product-price">
                                <span className="price">{Number(product?.product_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                <span className="discount">{Number(product?.product_discount || '').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                            <div className="content">
                                <p>Mô tả: {product?.product_description_sort}</p>
                            </div>
                            <div className="show-category">
                                <div className="category-name">
                                    {/* {categories.map((cate, index) => {
                                        const cateName = categories.find(cate => cate._id === product?.categoryId)
                                        return (
                                            <p key={index}>{cateName?.category_name}</p>
                                        )
                                    })} */}
                                </div>
                            </div>
                            <form className="add-to-cart"
                                onSubmit={handleSubmit(onaddToCart)}
                            >
                                <div className="quantity">
                                    <p onClick={decrease}>-</p>
                                    <input type="text" value={count} />
                                    <p onClick={increase}>+</p>
                                </div>
                                <div className="cart-submit">
                                    <button >THÊM VÀO GIỎ</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr />
                    <Tabs activeKey={activeTab} onChange={handleTabChange}>
                        <TabPane tab="MÔ TẢ" key="description">
                            <div className="tab-content" id="descriptionContent">
                                {/* <!-- box1 --> */}
                                <div className="product-box">
                                    <div className="product-title">
                                        <h1>Lorem Ipsum là gì?</h1>
                                    </div>
                                    <div className="product-content">
                                        <p>
                                            {product?.product_description_long}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="ĐÁNH GIÁ" key="evaluate">
                            <div className="tab-content" id="evaluateContent">
                                <div className="evaluate-title">
                                    <h1>Đánh giá</h1>
                                </div>
                                <div className="evaluate-content">Chưa có đánh giá nào</div>
                                <ul className="conment-list">
                                    <li>
                                        <h1>Đào minh Ngọc</h1>
                                        <span>20/12/2022</span>
                                        <p>đẹp</p>
                                    </li>
                                    <li>
                                        <h1>Đào minh Ngọc</h1>
                                        <span>20/12/2022</span>
                                        <p>đẹp</p>
                                    </li>

                                </ul>
                                <div className="evaluate-box">
                                    <form action="">
                                        <div className="form-title">
                                            <h1>Hãy là người đầu tiên nhận xét  </h1>
                                            <p>Đánh giá của bạn</p>
                                        </div>
                                        <ul>
                                            <li><button type="submit">1</button></li>|
                                            <li><button type="submit">2</button></li>|
                                            <li><button type="submit">3</button></li>|
                                            <li><button type="submit">4</button></li>|
                                            <li><button type="submit">5</button></li>|
                                        </ul>
                                        <div className="form-comment">
                                            <label>Nhận xét của bạn *</label> <br />
                                            <textarea name="" id="" cols={30} rows={10}></textarea>
                                        </div>
                                        <div className="form-submit">
                                            <div className="form-name">
                                                <label>Tên *</label> <br />
                                                <input type="text" />
                                            </div>
                                            <div className="form-email">
                                                <label>Email *</label> <br />
                                                <input type="email" />
                                            </div>
                                        </div>
                                        <div className="btn-submit">
                                            <button type="submit">GỬI ĐI</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                    <hr />

                </div>

            </section >
            <section className="relate-products">
                <div className="product-wrapper">
                    <h1 className="product-title">SẢN PHẨM TƯƠNG TỰ</h1>
                    <div className="product-list">
                        {products?.products?.docs?.map((pro: IProduct, index: string) => {
                            return (
                                <li key={index}>
                                    <img src={pro?.product_images?.url}
                                        alt="" />
                                    <div className="product-title">
                                        <Link to={`/products/${pro.slug}`}>{pro?.product_name?.length > 15 ? pro.product_name.slice(0, 15).concat("...") : pro.product_name}</Link> <br />
                                        <span className="price">{Number(pro.product_price || '').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                </li>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="contact-wrapper">
                    <div className="contact-title">
                        <h1>Đăng ký để nhận cập nhật</h1>
                    </div>
                    <div className="contact-content">
                        <p>Để lại email để không bỏ lỡ bất kì ưu đãi nào</p>
                    </div>
                    <form action="" className="contact-form">
                        <input type="text" placeholder="Email..." />
                        <button type="submit">ĐĂNG KÝ</button>
                    </form>
                </div>
            </section>
        </div >
    )
}

export default ProductDetail