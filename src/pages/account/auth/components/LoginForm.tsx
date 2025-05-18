import React, { useState } from 'react';
import TextBox from '../../../../components/input/TextBox';
import LoginRequest from '../../../../models/input/LoginRequest';
import authApi from '../../../../api/AuthApi';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
    onSwitchMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchMode }) => {
    const [form, setForm] = useState({
        login: '',
        password: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (!form.login.trim()) newErrors.login = "Email or username is required";
        if (!form.password) newErrors.password = "Password is required";
        
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
            const { token } = await authApi.login(payload);
            
            localStorage.setItem("token", token);
            window.dispatchEvent(new Event('storage'));
            navigate("/dashboard");
        } catch (err: any) {
            setApiError(err.response?.data?.message || "An error occurred during authentication");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-form__title">Welcome Back</h2>
            <div className="auth-form__fields">
                <TextBox
                    placeholder="Email or Username"
                    value={form.login}
                    onChange={handleChange("login")}
                    error={errors.login}
                />
                <TextBox
                    placeholder="Password"
                    isPassword
                    value={form.password}
                    onChange={handleChange("password")}
                    error={errors.password}
                />
            </div>
            {apiError && <div className="auth-error">{apiError}</div>}
            <button className="auth-button" style={{marginTop: "2rem"}} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Sign In"}
            </button>
            <div className="auth-divider">or</div>
            <button
                type="button"
                className="auth-toggle"
                onClick={onSwitchMode}
                disabled={isSubmitting}
            >
                Don't have an account? Register ...
            </button>
        </form>
    );
};

export default LoginForm; 