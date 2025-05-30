import './Header.css';
import {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import UserBadge from "../userBadge/UserBadge";

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        checkAuthentication();
        window.addEventListener('storage', checkAuthentication);
        return () => {
            window.removeEventListener('storage', checkAuthentication);
        };
    }, []);

    const handleLoginClick = () => {
        navigate('/account/auth/login');
    }

    return (
        <header className={'header'}>
            <div className={'header-container'}>
                <div className={'header-left__container'}>
                    <Link to={'/'} className={'logo'}>
                        <img src={'/logo.svg'} alt={'Travel Journal'} />
                    </Link>

                    <nav className={'header-nav'} aria-label={'main menu'}>
                        <ul>
                            <li>
                                <Link to={'/explore'}>Explore</Link>
                            </li>
                            <li>
                                <Link to={'/create'}>Create</Link>
                            </li>
                            <li>
                                <Link to={'/inspire'}>Inspire</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={'header-actions'}>
                    {isAuthenticated ? (
                        <UserBadge />
                    ) : (
                        <button className={'btn-outline'} onClick={handleLoginClick}>Login</button>
                    )}
                    <Link to={'/create'} className={'btn-primary'}>
                        Start your first journal
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
