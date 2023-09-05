import { Link } from "react-router-dom"

type IProp = {
    pro: any,
    originalPrice: number
}
const ProductComponents = ({ pro, originalPrice }: IProp) => {

    return (
        <div>
            <div className="absolute z-30 mt-3">
                {pro.product_discount ? <span className="product-sale">-{pro.product_discount}%</span> : ''}
            </div>
            <Link to={`/products/${pro._id}`} className="product-image ">
                <img src={pro.product_images.url}
                    alt="" />
            </Link>
            <div className="product-content">
                <h1 className="product-title"><Link to={`/products/${pro._id}`}>{pro?.product_name?.length > 15 ? pro.product_name.slice(0, 15).concat("...") : pro.product_name}</Link></h1>
                <div className="product-price">
                    <div className="discount"><span>{Number(originalPrice || '').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></div>
                    <div className="price"><span>{Number(pro.product_price || '').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></div>
                </div>
            </div>
        </div>
    )
}

export default ProductComponents