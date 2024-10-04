import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className = "footer-left" >
                    <h3 >Gym Scheduler Management</h3 >
                    <nav className = "footer-nav" >
                        <ul >
                            <li ><a href = "/" >Home</a ></li >
                            <li ><a href = "/schedule" >Schedule</a ></li >
                            <li ><a href = "/book-schedule" >Book Schedule</a ></li >
                            <li ><a href = "/signin" >Sign In</a ></li >
                            <li ><a href = "/signup" >Sign Up</a ></li >
                        </ul >
                    </nav >
                </div >
                <div className = "footer-right">
                    <form className="contact-form">
                        <textarea
                            placeholder="Contact us..."
                            rows="3"
                            className="contact-textarea"
                        />
                        <button type="submit" className="contact-button">Contact Us</button>
                    </form>
                </div>
            </div>
            <div className="footer-social">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
            </div>
            <div className="footer-copyright">
                <p>© 2024 Gym Scheduler Management. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
