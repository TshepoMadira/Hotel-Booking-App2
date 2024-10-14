import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <img src="src/assets/images/Screenshot__2_-removebg-preview.png" alt="Logo" className="logo" />
                </div>
                <div className="footer-right">
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contactus">Contact Us</Link>
                    <Link to="/faqs">FAQs</Link>
                    <Link to="/termsandconditions">Terms and Conditions</Link>
                </div>
            </div>
            <hr className="footer-divider" />
            <div className="footer-bottom">
                <div className="social-media-links">
                    <a href="https://twitter.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://facebook.com/YourHotelPage" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://instagram.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://youtube.com/YourHotelChannel" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                    </a>
                </div>
                <p className="pp">© 2024 Paragon International Limited. All rights reserved.</p>
            </div>
            {scrolling && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    <i className="fas fa-arrow-up"></i>
                </button>
            )}
        </footer>
    );
};

export default Footer;
