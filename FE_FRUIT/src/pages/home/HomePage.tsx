import { Link } from "react-router-dom";
import "./HomePage.scss"
import { useEffect, useContext, useState } from "react";
import { getAllProducts } from "../../api/Product";
import { toast } from 'react-toastify';
import { ProductContext } from "../../provider/ProductProvider";
import ProductComponents from "../../components/ProductList";
import { IProduct } from "../../types/Product";
const HomePage = () => {
    const { state: products, dispatch } = useContext(ProductContext);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const productList = products.products.docs;

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAllProducts();
                if (data) {
                    dispatch({ type: "product/getall", payload: data.products })
                }
                else {
                    toast.error(data)
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        })()
    }, [dispatch])

    useEffect(() => {
        // Lắng nghe sự kiện cuộn
        const handleScroll = () => {
            if (window.scrollY > 100) { // Khi cuộn xuống dưới 200px, hiển thị nút
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        // Đăng ký sự kiện lắng nghe cuộn
        window.addEventListener("scroll", handleScroll);

        // Hủy đăng ký sự kiện khi component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const handleScrollToTop = () => {
        const scrollToTop = () => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, -60);
                requestAnimationFrame(scrollToTop);
            }
        };
        scrollToTop();
    };

    return (
        <div>
            <div className="container">
                {/* <!-- SLIDER --> */}
                <section className="slider-section">
                    <div className="slider-wrapper">
                        <div className="slider-caption">
                            <div className="slider-title">
                                <p>Walnuts</p>
                            </div>
                            <h1>100% tự nhiên</h1>
                            <div className="slider-sale">
                                <p>Giảm giá khi đặt mua ngay hôm nay</p>
                            </div>
                            <div className="slider-buy">
                                <button type="submit">Mua ngay</button>
                            </div>
                        </div>
                        <div className="slider-items">
                            <Link to="">
                                <img src="http://mauweb.monamedia.net/cleverfood/wp-content/uploads/2019/05/imgslide22.png"
                                    alt="" />
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="feature-category-section">
                    <div className="grid grid-cols-2 feature-category-wrapper">
                        {/* <!-- image 1 --> */}
                        <div className="image">
                            <Link to="">
                                <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865033/project_fruit/banner36_mknogf.jpg"
                                    alt="" />
                            </Link>
                        </div>
                        {/* <!-- image 2 --> */}
                        <div className="image">
                            <Link to="">
                                <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865033/project_fruit/banner34_hso88u.jpg"
                                    alt="" />
                            </Link>
                        </div>
                        {/* <!-- image 3 --> */}
                        <div className="image">
                            <Link to="">
                                <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865033/project_fruit/banner35_ih7oa3.jpg"
                                    alt="" />
                            </Link>
                        </div>
                        {/* <!-- image 4 --> */}
                        <div className="image">
                            <Link to="">
                                <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865026/project_fruit/banner28_ti1psh.jpg"
                                    alt="" />
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="feature-product-section">
                    <div className="feature-product-wrapper">
                        <div className="product-title">
                            <h1>Sản phẩm nổi bật</h1>
                        </div>
                        <ul className="category-list">
                            <li><Link to="">MỚI NHẤT</Link></li>
                            <li><Link to="">GIẢM GIÁ</Link></li>
                            <li><Link to="">BÁN CHẠY</Link></li>
                        </ul>
                        <div className="product-list">
                            <div className="product-grid">
                                {productList?.map((pro: IProduct, index: string) => {
                                    const originalPrice = pro.product_price / (1 - pro.product_discount / 100);
                                    return (
                                        <div key={index} className="product-col">
                                            <ProductComponents originalPrice={originalPrice} pro={pro} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="banner-section">
                    <div className="banner-wrapper">
                        <h1>Khuyến Mãi Trong Tuần</h1>
                        <p className="banner-content">Cơ hội để gia đình bạn sở hữu những sản phẩm ưu đãi</p>
                        <div className="banner-time">
                            <div className="hour">
                                <p>0</p>
                                <p>GIỜ</p>
                            </div>
                            <div className="minute">
                                <p>0</p>
                                <p>PHÚT</p>
                            </div>
                            <div className="second">
                                <p>0</p>
                                <p>GIÂY</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="slider-section-footer">
                    <div className="slider-wrapper-footer">
                        <div>
                            <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865224/project_fruit/brand5_tonf5p.png" alt="" />
                        </div>
                        <div>
                            <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865224/project_fruit/brand1-1_vcta6d.png" alt="" />
                        </div>
                        <div>
                            <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865224/project_fruit/brand2-1_fdepj3.png" alt="" />
                        </div>
                        <div>
                            <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865224/project_fruit/brand1_twnhnh.png" alt="" />
                        </div>
                        <div>
                            <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865224/project_fruit/brand3_tuzwtz.png" alt="" />
                        </div>
                        <div>
                            <img src="https://res.cloudinary.com/djlylbhrb/image/upload/v1691865224/project_fruit/brand2_jlt1s5.png" alt="" />
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
                            <input type="text" placeholder="Email..." name="a" />
                            <button type="submit">ĐĂNG KÝ</button>
                        </form>
                    </div>
                </section>
                <button
                    id="scrollToTopButton"
                    onClick={handleScrollToTop}
                    className={`scroll-button ${showScrollButton ? 'visible' : 'hidden'}`}
                >
                    ↑
                </button>

            </div>
        </div>
    )
}

export default HomePage