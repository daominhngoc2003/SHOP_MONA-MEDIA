import { ICategory } from "../types/Category";
import { instance } from "./instance";


export const getAllCategory = () => {
    return instance.get('/categories');
}
export const getAllCategories = (currentPages: number, _keywords: string) => {
    return instance.get(`/categories?_page=${currentPages}&_keywords=${_keywords}`);
}

export const getProductByCategory = (categoryId: string) => {
    return instance.get(`/categories/${categoryId}/products`);
};

export const getCategoryById = (id: string) => {
    return instance.get(`/categories/${id}`);
}

// export const getCategoryBySlug = (slug: string) => {
//     return instance.get(`/product/${slug}`);
// }


export const deleteCategory = (id: string) => {
    return instance.delete(`/categories/${id}`);
}


export const updateCategory = (category: ICategory) => {
    return instance.put(`/categories/${category._id}`, category);
}

export const addCategory = (category: ICategory) => {
    return instance.post(`/categories`, category);
}

