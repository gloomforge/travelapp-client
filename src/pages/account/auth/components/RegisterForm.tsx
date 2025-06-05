import './AuthForms.css';
import React from 'react';
import TextBox from '../../../../components/input/TextBox';
import RegisterRequest from '../../../../models/input/RegisterRequest';
import { AuthApi } from '../../../../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import useAuthForm from '../../../../hooks/useAuthForm';

interface RegisterFormProps {
    onSwitchMode: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchMode }) => {
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
            name: '',
            email: '',
            password: ''
        }
    });
    
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (!form.name.trim()) newErrors.name = "Required";
        if (!form.email.trim()) newErrors.email = "Required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
        if (!form.password) newErrors.password = "Required";
        else if (form.password.length < 6) newErrors.password = "Min 6 characters";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            const payload: RegisterRequest = {
                name: form.name,
                email: form.email,
                password: form.password
            };
            const response = await AuthApi.register(payload);
            
            if (response && response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("refreshToken", response.refreshToken);
                window.dispatchEvent(new Event('storage'));
                navigate("/");
            } else {
                setApiError("Invalid response from server");
            }
        } catch (err: any) {
            console.error("Registration error:", err);
            setApiError(
                err.response?.data?.message || 
                "Registration failed. This username or email may be taken."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-form">
            <h2 className="auth-form-title">Join Us Today</h2>
            <p className="auth-form-subtitle">Create your account</p>
            
            <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                    <TextBox
                        placeholder="Username"
                        value={form.name}
                        onChange={handleChange("name")}
                        error={errors.name}
                        className="auth-form-input"
                        autoComplete="username"
                    />
                </div>
                
                <div className="auth-form-group">
                    <TextBox
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange("email")}
                        error={errors.email}
                        className="auth-form-input"
                        autoComplete="email"
                        type="email"
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
                        autoComplete="new-password"
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
                    {isSubmitting ? "Creating..." : "Create Account"}
                </button>
            </form>
            
            <div className="auth-form-footer">
                Have an account?
                <span 
                    className="auth-form-link" 
                    onClick={onSwitchMode}
                >
                    {" Sign in"}
                </span>
            </div>
        </div>
    );
};

export default RegisterForm; 