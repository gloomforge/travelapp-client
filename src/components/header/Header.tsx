import './Header.css';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

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
                        <button className={'btn-outline'}>Logout</button>
                    ) : (
                        <button className={'btn-outline'}>Login</button>
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
