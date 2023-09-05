import { ISignin, ISignup } from "../types/Auth";
import { IResetPassword, IUser } from "../types/User";
import { instance } from "./instance";


export const SigninUser = (user: ISignin) => {
    return instance.post(`/signin`, user);
}

export const SignupUser = (user: ISignup) => {
    return instance.post(`/signup`, user);
}

export const SearchUser = (currentPages: number, _keywords: string) => {
    return instance.get(`/users/search?_page=${currentPages}&_keywords=${_keywords}`);
}

export const GetAllUser = () => {
    return instance.get('/users');
}

export const UpdateUser = (user: IUser) => {
    return instance.put(`/users/` + user._id, user);
}

export const DeleteUser = (_id: string) => {
    return instance.delete(`/users/` + _id);
}

export const LogoutUser = () => {
    localStorage.clear();
    window.location.reload();
}

export const ForgetPassword = (email: string) => {
    return instance.post("/users/forget-password", email)
}

export const VerifyEmailCode = (emailToken: object) => {
    return instance.post("/users/verify-email", emailToken)
}

export const ResetPassword = (data: IResetPassword) => {
    return instance.post("/users/reset-password", data)
}