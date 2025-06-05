import './AuthForms.css';
import React from 'react';
import TextBox from '../../../../components/input/TextBox';
import LoginRequest from '../../../../models/input/LoginRequest';
import { AuthApi } from '../../../../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import useAuthForm from '../../../../hooks/useAuthForm';

interface LoginFormProps {
    onSwitchMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchMode }) => {
    const { 
        form, 
        errors, 
        isSubmitting, 
        apiError, 
        handleChange, 
        setErrors, 
        setIsSubmitting, 
        setApiError 
    } = useAuthForm({
        initialValues: {
            login: '',
            password: ''
        }
    });
    
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (!form.login.trim()) newErrors.login = "Required";
        if (!form.password) newErrors.password = "Required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            const payload: LoginRequest = {
                login: form.login,
                password: form.password
            };
            const response = await AuthApi.login(payload);

            if (response && response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("refreshToken", response.refreshToken);
                window.dispatchEvent(new Event('storage'));
                navigate("/");
            } else {
                setApiError("Invalid response from server");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setApiError(
                err.response?.data?.message || 
                "Invalid credentials. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-form">
            <h2 className="auth-form-title">Welcome Back</h2>
            <p className="auth-form-subtitle">Sign in to your account</p>
            
            <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                    <TextBox
                        placeholder="Email or Username"
                        value={form.login}
                        onChange={handleChange("login")}
                        error={errors.login}
                        className="auth-form-input"
                        autoComplete="username"
                    />
                </div>
                
                <div className="auth-form-group">
                    <TextBox
                        placeholder="Password"
                        isPassword
                        value={form.password}
                        onChange={handleChange("password")}
                        error={errors.password}
                        className="auth-form-input"
                        autoComplete="current-password"
                    />
                </div>
                
                {apiError && (
                    <div className="auth-form-error">
                        {apiError}
                    </div>
                )}
                
                <button 
                    className="auth-form-button" 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
            </form>
            
            <div className="auth-form-footer">
                No account?
                <span 
                    className="auth-form-link" 
                    onClick={onSwitchMode}
                >
                    {" Create one"}
                </span>
            </div>
        </div>
    );
};

export default LoginForm; 