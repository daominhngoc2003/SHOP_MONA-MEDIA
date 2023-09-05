import { IImagesProduct } from "../types/Product";
import { instance } from "./instance";


export const UploadImageUpdate = (url: IImagesProduct) => {
    return instance.put(`/images/${url.publicId}`, url);
}

export const UploadFileImages = (url: string) => {
    return instance.post(`/images`, url);
}
export const RemoveFileImages = (urlId: string) => {
    return instance.delete(`/images/${urlId}`);
}

