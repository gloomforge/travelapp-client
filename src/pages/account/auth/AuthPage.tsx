import './AuthPage.css';
import { useState } from 'react';
import TextBox from '../../../components/input/TextBox';

function AuthPage() {
    const [mode, setMode] = useState('login');
    const toggleMode = () => setMode(prev => (prev === 'login' ? 'register' : 'login'));

    return (
        <div className='auth-container'>
            <div className='auth-form'>
                <div className='auth-form__header'>
                    <h2 className='auth-form__title'>
                        {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
                    </h2>
                </div>
                <div className='auth-form__fields'>
                    <div className={`field-panel ${mode === 'login' ? 'active' : ''}`}>
                        <TextBox placeholder='Email or Username' />
                        <TextBox placeholder='Password' isPassword />
                    </div>
                    <div className={`field-panel ${mode === 'register' ? 'active' : ''}`}>
                        <TextBox placeholder='Username' />
                        <TextBox placeholder='Email' />
                        <TextBox placeholder='Password' isPassword />
                    </div>
                </div>
                <div className='auth-divider'>or</div>
                <button className='auth-button' onClick={toggleMode}>
                    {mode === 'login' ? 'Create Account' : 'Sign In'}
                </button>
            </div>
            <div className='auth-hero' />
        </div>
    );
}

export default AuthPage;