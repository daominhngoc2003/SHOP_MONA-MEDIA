import axios from "axios";
// const token = JSON.parse(localStorage.getItem("user") || '{}');

export const instance = axios.create({
    baseURL: "https://tclq6w-8080.csb.app/api",
    // headers: {
    //     // Dấu chấm than chắc chắn dữ liệu có và không phải null
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     Authorization: `Bearer ${token.accessToken}`
    // }
})