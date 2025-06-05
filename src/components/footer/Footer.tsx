import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    
    if (location.pathname.includes('/account/auth/') || location.pathname.includes('/create-trip')) {
        return null;
    }

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-logo">
                        <h2>Travel Journal</h2>
                    </div>
                    
                    <div className="footer-column">
                        <div className="footer-links">
                            <Link to="/destinations" className="footer-link">Destinations</Link>
                            <Link to="/journals" className="footer-link">Journals</Link>
                            <Link to="/guides" className="footer-link">Guides</Link>
                        </div>
                    </div>
                    
                    <div className="footer-column">
                        <div className="footer-links">
                            <Link to="/help" className="footer-link">Help</Link>
                            <Link to="/faq" className="footer-link">FAQ</Link>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <div className="copyright">
                        © {currentYear} Travel Journal
                    </div>
                    <div className="bottom-links">
                        <Link to="/privacy" className="bottom-link">Privacy</Link>
                        <Link to="/terms" className="bottom-link">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;