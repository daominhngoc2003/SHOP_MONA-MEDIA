import { instance } from "./instance";


export const UploadImage = (image: string) => {
    return instance.post(`/images/upload`, image);
}

