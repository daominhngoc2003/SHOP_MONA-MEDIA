
const ProductReducer = (state: any, action: { payload: any, type: string }) => {
    switch (action.type) {
        case "product/search":
            state.products = action.payload;
            break;
        case "product/getall":
            state.products = action.payload;
            break;
        case "product/getProductByCategory":
            console.log(action.payload);

            state.products = action.payload;
            break;
        case "product/getDetail":
            state.products = action.payload;
            break;
        case "product/getProductBySlug":
            state.products = action.payload;
            break;
        case "product/add":
            state.products.docs.push(action.payload)
            break;
        case "product/update":
            const product = action.payload;
            state.products.docs = state?.products?.docs?.map((item: any) => item._id === product._id ? product : item)
            break;
        case "product/delete":
            const id = action.payload;
            state.products.docs = state?.products?.docs?.filter((item: any) => item._id !== id)
            break;
        default:
            return state;
    }
}

export default ProductReducer