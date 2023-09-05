import { Link } from "react-router-dom";
import { LogoutUser } from "../../api/User";
import "./Header-client.scss"
import Search from "../Search";

const Header = () => {
    const logout = () => {
        LogoutUser();
        window.location.reload();
    }
    const { user } = JSON.parse(localStorage.getItem("user") || '{}')
    return (
        <div>
            {/* HEADER  */}
            <header className="header-wrapper">
                <div>
                    <nav className="navbar">
                        <div className="navbar-wrapper">
                            <div className="navbar-logo">
                                <h1>CLEVERFOOD</h1>
                            </div>
                            <ul className="navbar-menu">
                                <li><Link to="/">TRANG CHỦ</Link></li>
                                <li><Link to="/about">GIỚI THIỆU</Link></li>
                                <li>
                                    <Link to="/products">SẢN PHẨM</Link>
                                </li>
                                <li><Link to="/products">TIN TỨC</Link></li>
                                <li><Link to="/contact">LIÊN HỆ</Link></li>
                            </ul>
                            <Search />
                            <div className="navbar-actions">
                                <div className="account menu-item">
                                    {user ? <Link to="#"><img width={20} style={{ borderRadius: "100%" }} src={user?.user_avatar} alt="Avata" /></Link> : <Link to="#"><i className="fa-solid fa-user"></i></Link>}
                                    {user ? <ul className="account-submenu">
                                        <li><Link to="">Tài khoản của tôi</Link></li>
                                        <li><Link to="/bills/detail">Đơn mua</Link></li>
                                        <li><button onClick={logout}>Đăng xuất</button></li>
                                    </ul> : <ul className="account-submenu">
                                        <li><Link to="/signin">Đăng nhập</Link></li>
                                        <li><Link to="/signup">Đăng ký</Link></li>
                                    </ul>
                                    }
                                    {user?.user_role === "admin" ? <ul className="account-submenu">

                                        <li><Link to="">Tài khoản của tôi</Link></li>
                                        <li><Link to="/bills/detail">Đơn mua</Link></li>
                                        <li><Link to="/admin">Trang quản trị</Link></li>
                                        <li><button className="logout" onClick={logout}>Đăng xuất</button></li>
                                    </ul> : <div className="cart"></div>
                                    }
                                </div>
                                <div className="cart">
                                    <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header