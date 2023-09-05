
const CartReducer = (state: any, action: { payload: any, type: string }) => {
    switch (action.type) {
        case "cart/getCartByUser":
            state.carts = action.payload;
            break;
        case "cart/addToCart":
            state.carts?.products?.push(action.payload.products)
            break;
        case "cart/deleteAllProductCart":
            state.carts.products = [];
            break;
        case "cart/updateProductCart":
            const product = action.payload;
            state.categories = state?.categories?.map((item: any) => item._id === product._id ? product : item)
            break;
        case "cart/deleteProductCart":
            const id = action.payload;
            state.categories = state?.categories?.filter((item: any) => item._id !== id)
            break;
        default:
            return state;
    }
}

export default CartReducer