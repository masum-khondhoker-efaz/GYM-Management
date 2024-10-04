import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children, role }) => {
    return (
        <div className="layout-container">
            <Navbar role={role} />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;