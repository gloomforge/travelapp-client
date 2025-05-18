import React, {useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import './TextBox.css';

interface TextBoxProps {
    placeholder?: string;
    isPassword?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

const TextBox: React.FC<TextBoxProps> = ({
    placeholder = '',
    isPassword = false,
    value,
    onChange,
    error
}) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isLabelActive = focused || value !== '';
    const hasError = !!error;

    return (
        <div className={`textbox-container ${hasError ? 'has-error' : ''}`}>
            <label
                className={`floating-label ${isLabelActive ? 'active' : ''}`}>
                {placeholder}
            </label>
            <div className="input-wrapper">
                <input
                    type={isPassword && !showPassword ? 'password' : 'text'}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`textbox-input ${hasError ? 'input-error' : ''}`}
                    aria-invalid={hasError}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="visibility-toggle"
                        onClick={() => setShowPassword(s => !s)}
                        aria-label="Toggle password visibility"
                    >
                        <span className="icon">
                            {showPassword ? FaEyeSlash({size: 16}) : FaEye({size: 16})}
                        </span>
                    </button>
                )}
            </div>
            {hasError && <div className="error-message">{error}</div>}
        </div>
    );
};

export default TextBox;
