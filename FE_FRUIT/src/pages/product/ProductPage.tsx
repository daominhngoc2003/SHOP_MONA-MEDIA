import { Link } from "react-router-dom";
import "./ProductPage.scss"
import { useEffect, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { ProductContext } from "../../provider/ProductProvider";
import { ICategory } from "../../types/Category";
import { getAllCategory } from "../../api/Category";
import { IProduct } from "../../types/Product";
import ProductComponents from "../../components/ProductList";
import { Pagination } from 'antd';
import { SearchProduct, getProductByCategoryIdSearch } from "../../api/Product";

const ProductPage = () => {
    const [categories, setCategory] = useState<ICategory[]>([])
    const { state: products, dispatch } = useContext(ProductContext);
    const [currentPages, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [_keywords] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const { data } = await SearchProduct(currentPages, _keywords);
                if (data) {
                    dispatch({ type: "product/getall", payload: data.products })
                    setTotalItems(data.pagination.totalItems);
                }
                else {
                    toast.error(data)
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        })()
    }, [currentPages, _keywords])

    // XỬ LÝ KHI CHUYỂN TRANG
    const onHandlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    //=====================================CATEGORY===============================
    // LẤY TẤT CẢ DỮ LIỆU danh mục
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAllCategory();
                // console.log(data);

                if (data) {
                    setCategory(data.categories.docs)
                }
                else {
                    toast.error(data.error.response.data.message)
                }

            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        })()
    }, [])

    const getProductByCategory = async (categoryId: string) => {
        const { data } = await getProductByCategoryIdSearch(categoryId);
        if (data) {
            await dispatch({ type: "product/getProductByCategory", payload: data.productResponse })
        }
    }
    return (
        <div>
            {/* <!-- PRODUCT --> */}
            <section className="product-section">
                <div className="product-wrapper">
                    <div className="product-header-main">
                        <div className="product-left">
                            <Link to="/">TRANG CHỦ</Link>
                            <p>/</p>
                            <h1>CỬA HÀNG</h1>
                        </div>
                        <div className="product-right">
                            <p>Hiển thị 1–12 trong 16 kết quả</p>
                            <select name="" id="">
                                <option value="">Thứ tự mặc định</option>
                                <option value="">1</option>
                                <option value="">1</option>
                            </select>
                        </div>
                    </div>

                    {/* <!-- PRODUCT-LIST --> */}
                    <div className="product-list">
                        <div className="product-left">
                            <div className="category-box">
                                <div className="category-header">
                                    <h1>DANH MỤC SẢN PHẨM</h1>
                                </div>
                                <ul className="category-content">
                                    {categories?.map((cate, index) => {
                                        return (
                                            <li
                                                onClick={() => getProductByCategory(cate._id as string)}
                                                key={index}><Link to="#">{cate.category_name}</Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                            {/* <div className="filter-price-box">
                                <div className="filter-header">
                                    <h1>LỌC THEO GIÁ</h1>
                                </div>
                                <div className="filter-content">
                                    <input type="range" />
                                </div>
                            </div> */}
                            <div className="product-box">
                                <div className="product-header">
                                    <h1>SẢN PHẨM</h1>
                                </div>
                                <div className="product-content">
                                    <ul>
                                        {products?.products?.docs?.map((pro: IProduct, index: string) => {
                                            return (
                                                <li key={index}>
                                                    <img src={pro?.product_images?.url}
                                                        alt="" />
                                                    <div className="product-title">
                                                        <Link to={`/products/${pro._id}`} >{pro?.product_name?.length > 15 ? pro.product_name.slice(0, 15).concat("...") : pro.product_name}</Link> <br />
                                                        <span className="price">{Number(pro.product_price || '').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="product-grid">
                                {products?.products?.docs?.map((pro: IProduct, index: string) => {
                                    const originalPrice = pro.product_price / (1 - pro.product_discount / 100);
                                    return (
                                        <div key={index} className="product-col">
                                            <ProductComponents originalPrice={originalPrice} pro={pro} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="text-center">
                                <Pagination current={currentPages} total={totalItems} onChange={onHandlePageChange} />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default ProductPage