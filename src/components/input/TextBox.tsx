import React, { useState, InputHTMLAttributes, ComponentType, useEffect } from 'react';
import { IconBaseProps } from 'react-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './TextBox.css';

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    error?: string;
    isPassword?: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({
    placeholder = '',
    error,
    isPassword = false,
    className = '',
    ...props
}) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value);
    const isLabelActive = focused || hasValue;
    const hasError = !!error;

    useEffect(() => {
        setHasValue(!!props.value);
    }, [props.value]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(!!e.target.value);
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const Icon = (showPassword ? FaEyeSlash : FaEye) as ComponentType<IconBaseProps>;

    return (
        <div className={`textbox-container ${hasError ? 'has-error' : ''}`}>
            <div className="textbox-relative-wrapper">
                <input
                    {...props}
                    type={isPassword && !showPassword ? 'password' : 'text'}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={handleChange}
                    className={`textbox-input ${isPassword ? 'with-password-toggle' : ''} ${className}`}
                    aria-invalid={hasError}
                    placeholder=""
                />
                <label
                    className={`floating-label ${isLabelActive ? 'active' : ''}`}>
                    {placeholder}
                </label>
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="textbox-password-toggle"
                        aria-label="Toggle password visibility"
                    >
                        <Icon size={16} />
                    </button>
                )}
            </div>
            {error && (
                <div className="textbox-error-message">
                    {error}
                </div>
            )}
        </div>
    );
};

export default TextBox;
