import './AuthPage.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function AuthPage() {
    const { authMode } = useParams<{ authMode?: string }>();
    const navigate = useNavigate();
    const currentMode = authMode === 'register' ? 'register' : 'login';
    
    const [visibleContent, setVisibleContent] = useState(currentMode);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'slide-left' | 'slide-right'>('slide-right');
    const [animationPhase, setAnimationPhase] = useState<'pre' | 'mid' | 'post'>('post');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMobile) {
            document.body.classList.add('auth-body');
        } else {
            document.body.classList.remove('auth-body');
        }
        
        return () => {
            document.body.classList.remove('auth-body');
        };
    }, [isMobile]);

    useEffect(() => {
        if (!authMode) {
            navigate('/account/auth/login', { replace: true });
        } else if (authMode !== 'login' && authMode !== 'register') {
            navigate('/account/auth/login', { replace: true });
        }

        if (currentMode !== visibleContent && animationPhase === 'post') {
            setAnimationPhase('pre');
            setSlideDirection(
                (currentMode === 'register') ? 'slide-right' : 'slide-left'
            );
            setIsAnimating(true);
            
            setTimeout(() => {
                setAnimationPhase('mid');
                setVisibleContent(currentMode);
                
                setTimeout(() => {
                    setAnimationPhase('post');
                    setIsAnimating(false);
                }, 250);
            }, 250);
        }
    }, [authMode, navigate, currentMode, visibleContent, animationPhase]);

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth <= 768;
            setIsMobile(newIsMobile);
            
            if (newIsMobile) {
                document.body.classList.add('auth-body');
            } else {
                document.body.classList.remove('auth-body');
            }
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.classList.remove('auth-body');
        };
    }, []);

    const handleSwitchMode = () => {
        if (animationPhase === 'post') {
            navigate(`/account/auth/${currentMode === 'login' ? 'register' : 'login'}`);
        }
    };

    const getAnimationClass = () => {
        if (!isAnimating) return '';
        
        if (animationPhase === 'pre') {
            return `${slideDirection}-out`;
        } else if (animationPhase === 'mid' || animationPhase === 'post') {
            return `${slideDirection}-in`;
        }
        return '';
    };

    const getHeroContent = (showContent = true) => {
        return (
            <>
                <img 
                    src="/images/travel-journal.jpg" 
                    alt="Travel" 
                    className="auth-hero-image" 
                />
                {showContent && (
                    <div className="auth-hero-content">
                        <h2 className="auth-hero-title">
                            {currentMode === 'login' 
                                ? 'Welcome Back' 
                                : 'Join Us Today'}
                        </h2>
                        <p className="auth-hero-subtitle">
                            {currentMode === 'login'
                                ? 'Access your travel journal and continue your journey'
                                : 'Create an account to share your travel experiences'}
                        </p>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="auth-page">
            <div className="auth-content" ref={contentRef}>
                {isMobile && (
                    <div className="auth-hero">
                        {getHeroContent(false)}
                    </div>
                )}
                <div className="auth-form-container">
                    <div className="auth-form-wrapper">
                        <div className={`animated-form ${getAnimationClass()}`}>
                            {visibleContent === 'login' ? (
                                <LoginForm onSwitchMode={handleSwitchMode} />
                            ) : (
                                <RegisterForm onSwitchMode={handleSwitchMode} />
                            )}
                        </div>
                    </div>
                </div>
                {!isMobile && (
                    <div className="auth-hero">
                        {getHeroContent(true)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthPage;