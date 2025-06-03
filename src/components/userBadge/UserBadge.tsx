import React, { useEffect, useState, useRef } from 'react';
import './UserBadge.css';
import { UserApi } from '../../api/UserApi';
import UserResponse from '../../models/output/UserResponse';
import { useNavigate } from 'react-router-dom';

const UserBadge: React.FC = () => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userData = await UserApi.getMe();
                setUser(userData);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Failed to load user data');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        if (localStorage.getItem('token')) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.dispatchEvent(new Event('storage'));
        setIsOpen(false);
        navigate('/');
    };

    if (loading) {
        return <div className="user-badge user-badge--loading">Loading...</div>;
    }

    if (error || !user) {
        return null;
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    };

    return (
        <div className="user-badge-container" ref={dropdownRef}>
            <div 
                className={`user-badge ${isOpen ? 'user-badge--active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                    <div className="user-badge__initials">
                        {getInitials(user.name)}
                    </div>
                <div className="user-badge__info">
                    <span className="user-badge__name">{user.name}</span>
                </div>
            </div>

            {isOpen && (
                <div className="user-badge__dropdown">
                    <div className="user-badge__dropdown-item user-badge__email">
                        {user.email}
                    </div>
                    <button 
                        className="user-badge__dropdown-item user-badge__logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserBadge;