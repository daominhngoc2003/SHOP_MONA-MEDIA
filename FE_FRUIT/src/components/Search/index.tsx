import { useForm } from "react-hook-form";
import { IProduct } from "../../types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchProduct } from "../../api/Product";
import "./Search.scss"
const Search = () => {
    const { register, handleSubmit } = useForm();
    const [product, setProduct] = useState<any>([])
    const [keyword, setKeyWord] = useState<string>('')
    const [isSearch, setIsSearch] = useState(false)
    const onHandleSearch = async () => {
        const { data } = await searchProduct(keyword);
        setProduct(data.products);
    }

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await searchProduct(keyword);
    //         setProduct(data.products.docs);
    //     };
    //     fetchProducts();
    // }, [keyword]);

    const handleOutsideClick = async (e: any) => {
        if (e.target.closest('#listProduct') || e.target.closest('#clickShowProduct')) {
            return
        }
        setIsSearch(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <div>
            <form action="" className="search-form" onSubmit={handleSubmit(onHandleSearch)}>
                <input type="text"
                    className="search-input" {...register("_keywords")}
                    onChange={(e) => setKeyWord(e.target.value)}
                    placeholder="Search ..." name="_keywords" />
                <button type="submit"
                    className="search-button"
                    aria-label="Justify"
                    onClick={() => setIsSearch(true)}
                    id="clickShowProduct"
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            {isSearch &&
                <div className="wrapper-search" id="listProduct">
                    <div className="container w-200">
                        <div className="p-2 bg-white rounded-md">
                            {/* check khong có sản phẩm nào thì hiển thị ra */}
                            {product?.docs?.length === 0 ? (
                                <div className="text-center notFound">
                                    Không tìm thấy sản phẩm nào
                                </div>
                            ) : (
                                product?.docs?.map((product: IProduct, index: string) => {
                                    return (
                                        <div key={index}>
                                            <div className=" product-list focus:visible">
                                                <div className="picture">
                                                    <Link to={`/products/${product.slug}`}>
                                                        <img
                                                            width={40}
                                                            height={30}
                                                            src={product.product_images.url}
                                                            alt="ảnh"
                                                            className="transition duration-200 ease-in-out hover:scale-105 md:h-[30px] md:w-[30px]"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="product-content">
                                                    <Link
                                                        to={`/products/${product.slug}`}
                                                        className="hover:text-yellow-500 transition duration-200"
                                                    >
                                                        {product.product_name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div >
                    </div >
                </div >
            }
        </div>
    )
}

export default Search