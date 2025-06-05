import './Header.css';
import {useEffect, useState, useRef} from "react";
import {useNavigate, Link, useLocation} from "react-router-dom";
import UserBadge from "../userBadge/UserBadge";

const Header = ()=> {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        checkAuthentication();
        window.addEventListener('storage', checkAuthentication);
        
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            window.removeEventListener('storage', checkAuthentication);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);
    
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        
        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [isMobileMenuOpen]);

    const handleLoginClick = () => {
        navigate('/account/auth/login');
        setIsMobileMenuOpen(false);
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleNavLinkClick = () => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }

    return (
        <header className="header" ref={menuRef}>
            <div className="header-container">
                <div className="header-left">
                    <Link to={'/'} className="header-logo">
                        Travel Journal
                    </Link>

                    <button 
                        className={`header-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <nav className={`header-nav ${isMobileMenuOpen ? 'active' : ''}`} aria-label="main menu">
                    <ul>
                        <li>
                            <Link to={'/list-journal'} className="nav-link" onClick={handleNavLinkClick}>
                                Explore
                            </Link>
                        </li>
                        <li>
                            <Link to={'/create-trip'} className="nav-link" onClick={handleNavLinkClick}>
                                Create
                            </Link>
                        </li>
                    </ul>
                    
                    {isAuthenticated && (
                        <div className="mobile-user-badge">
                            <UserBadge />
                        </div>
                    )}
                </nav>

                <div className="header-actions">
                    {isAuthenticated ? (
                        <UserBadge />
                    ) : (
                        <button className="btn btn-outline" onClick={handleLoginClick}>
                            Login
                        </button>
                    )}
                    <Link to={'/create-trip'} className="btn btn-primary" onClick={handleNavLinkClick}>
                        Start your first journal
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
