import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ClientLayout.scss"
const ClientLayout = () => {
    return (
        <div id="container">
            <Header />
            <main><Outlet /></main>
            <Footer />
        </div >
    )
}

export default ClientLayout