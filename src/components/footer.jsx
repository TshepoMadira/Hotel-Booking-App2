import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
;

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
                    <div className="award-box">
                        <div className="award-text">
                            <div className="award-title-border">
                                <p className="award-title">
                                    TRAVELLERS<br />CHOICE<br />AWARDS
                                </p>
                            </div>
                            <p className="award-description">
                                DreamScape Hotel received a Travellers' Choice Award due to exceptional customer reviews for Accommodation in Brits.
                            </p>
                          
                            <div className="ratings">
                                <span className="stars">★★★★★</span>
                                <span className="rating-text">Rated 5/5 by Travellers</span>
                            </div>
                        </div>
                     
                       
                    </div>
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
                <p className="pp">© 2025 DREAMSCAPE International Limited. All rights reserved.</p>
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