import "./css/Signup.scss"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupUser } from "../../../api/User";
import { toast } from 'react-toastify';
import { ISignup } from "../../../types/Auth";

const Signup = () => {
    const { register, handleSubmit } = useForm<ISignup>();
    const navigate = useNavigate();
    const onHandleSubmit = async (user: any) => {
        try {
            const { data } = await SignupUser(user);
            if (!data.user) {
                toast.error(data.message)
            }
            toast.success(data.message)
            navigate("/signin")
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <section className="signup-section">
                <div className="signup-wrapper">
                    <div className="form-signup">
                        <h4 className="signup-title">
                            Đăng ký
                        </h4>
                        <form action="#" method="POST" onSubmit={handleSubmit(onHandleSubmit)} id="signup-form">
                            <div className="signup-Last">
                                <label htmlFor="name">Full Name *</label> <br />
                                <input type="text" {...register("user_fullName")} placeholder="Your last full name" required />
                            </div>
                            <div className="signup-email">
                                <label htmlFor="email">Email *</label> <br />
                                <input type="email" {...register("user_email")} placeholder="Your email name" required />
                            </div>
                            <div className="signup-password">
                                <label htmlFor="password">Password *</label> <br />
                                <input type="password" {...register("user_password")} placeholder="Enter your password" required />
                            </div>
                            <div className="signup-confirmPassword">
                                <label htmlFor="confirmPassword">Confirm Password *</label> <br />
                                <input type="password" {...register("user_confirmPassword")} placeholder="Enter your confirmPassword"
                                    required />
                            </div>
                            <div className="signup-flex">
                                <div className="form-remember">
                                    <input type="checkbox" id="form-check" />
                                    <label htmlFor="form-check">I agree to the Terms & Policy</label>
                                </div>
                            </div>
                            <div className="btn-submit">
                                <button type="submit" id="submite-btn">TẠO TÀI KHOẢN</button>
                            </div>
                        </form>
                        <div className="form-signup-other">
                            <h5>or signup WITH</h5>
                            <ul>
                                <li><Link to="#" className="facebook-signup"><i className="fa-brands fa-facebook"></i>
                                    Signup whit facebook</Link></li>
                                <li><Link to="#" className="google-signup"><i className="fa-brands fa-google"></i> Signup with google</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup