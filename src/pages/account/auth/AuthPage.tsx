import './AuthPage.css';
import { useEffect, useState } from 'react';
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

    return (
        <div className="auth-container">
            <div className="forms-container">
                <div className={`animated-form ${getAnimationClass()}`}>
                    {visibleContent === 'login' ? (
                        <LoginForm onSwitchMode={handleSwitchMode} />
                    ) : (
                        <RegisterForm onSwitchMode={handleSwitchMode} />
                    )}
                </div>
            </div>
            <div className="auth-hero" />
        </div>
    );
}

export default AuthPage;