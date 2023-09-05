import "./css/Signin.scss"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SigninUser } from "../../../api/User";
import { toast } from 'react-toastify';
import { ISignin } from "../../../types/Auth";
import { AuthContext } from "../../../provider/AuthReducer";
import { useContext } from "react";

const Signin = () => {
    const { register, handleSubmit } = useForm<ISignin>();
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const onHandleSubmit = async (values: ISignin) => {
        try {
            const { data } = await SigninUser(values);
            if (data) {
                await dispatch({ type: "auth/login", payload: data.user })
                toast.success(data.message);
                const users = data;
                await localStorage.setItem("user", JSON.stringify(users));
                if (users?.user?.user_role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                window.location.reload();
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <section className="login-section">
                <div className="login-wrapper">
                    <div className="form-login">
                        <h4 className="login-title">
                            Đăng nhập
                        </h4>
                        <form action="#" onSubmit={handleSubmit(onHandleSubmit)} method="POST" id="login-form">
                            <div className="login-name">
                                <label htmlFor="email">Username *</label> <br />
                                <input type="text" {...register("user_email")} placeholder="Bạn nhập email" required />
                            </div>
                            <div className="login-password">
                                <label htmlFor="password">Password *</label> <br />
                                <input type="password" {...register("user_password")} placeholder="Enter your password" required />
                            </div>
                            <div className="login-flex">
                                <div className="htmlForm-remember">
                                    <input type="checkbox" id="htmlForm-check" />
                                    <label htmlFor="htmlForm-check">Nhớ tài khoản</label>
                                </div>
                                <div className="htmlForgot-password">
                                    <Link to="/forget-password">Quên mật khẩu?</Link>
                                </div>
                            </div>
                            <div className="htmlForm-register">
                                <Link to="/signup">Tạo tài khoản</Link>
                            </div>
                            <div className="btn-submit">
                                <button type="submit" id="submite-btn">ĐĂNG NHẬP</button>
                            </div>
                        </form>
                        <div className="form-login-other">
                            <h5>or login WITH</h5>
                            <ul>
                                <li><Link to="#" className="facebook-login"><i className="fa-brands fa-facebook"></i>
                                    Signup with facebook</Link></li>
                                <li><Link to="#" className="google-login"><i className="fa-brands fa-google"></i> Signup with google</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signin