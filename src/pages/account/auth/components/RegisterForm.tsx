import React, { useState } from 'react';
import TextBox from '../../../../components/input/TextBox';
import RegisterRequest from '../../../../models/input/RegisterRequest';
import authApi from '../../../../api/AuthApi';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
    onSwitchMode: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchMode }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
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
        if (apiError) {
            setApiError(null);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (!form.name.trim()) newErrors.name = "Username is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
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
            const response = await authApi.register(payload);
            
            if (response && response.token) {
                localStorage.setItem("token", response.token);
                window.dispatchEvent(new Event('storage'));
                navigate("/");
            } else throw new Error("Invalid response from server");
        } catch (err: any) {
            console.error("Registration error:", err);
            setApiError(
                err.response?.data?.message || 
                "Registration failed. This username or email may already be in use."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-form__title">Create Your Account</h2>
            <div className="auth-form__fields">
                <TextBox
                    placeholder="Username"
                    value={form.name}
                    onChange={handleChange("name")}
                    error={errors.name}
                />
                <TextBox
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange("email")}
                    error={errors.email}
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
                {isSubmitting ? "Processing..." : "Create Account"}
            </button>
            <div className="auth-divider">or</div>
            <button
                type="button"
                className="auth-toggle"
                onClick={onSwitchMode}
                disabled={isSubmitting}
            >
                Already have an account? Login ...
            </button>
        </form>
    );
};

export default RegisterForm; 