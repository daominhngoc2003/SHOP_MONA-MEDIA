import { IProduct } from "../types/Product";
import { instance } from "./instance";


export const SearchProduct = (currentPages: number, _keywords: string) => {
    return instance.get(`/products/search?_page=${currentPages}&_keywords=${_keywords}`);
}
export const getAllProducts = () => {
    return instance.get(`/products/search`);
}

export const getProductById = (id: string) => {
    return instance.get(`/products/${id}`);
}

// export const getProductBySlug = (slug: string) => {
//     return instance.get(`/product/${slug}`);
// }

export const getProductByCategoryId = (_id: string) => {
    return instance.get("/products/categoryId/" + _id);
};

export const getProductByCategoryIdSearch = (_id: string) => {
    return instance.get("/products/categoryId/search/" + _id);
};


export const deleteProduct = (id: string) => {
    return instance.delete(`/products/${id}`);
}


export const udpateProduct = (product: IProduct) => {
    const { _id, ...data } = product;
    console.log(_id);

    return instance.put(`/products/${product._id}`, data);
}

export const addProduct = (product: IProduct) => {
    return instance.post(`/products`, product);
}


export const searchProduct = (_keywords: string) => {
    return instance.get(`/products/search?_keywords=${_keywords}&_limit=5`);
}