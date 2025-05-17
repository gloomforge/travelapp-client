import React, {useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import './TextBox.css';

const TextBox = ({placeholder = '', isPassword = false}) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState('');

    const isLabelActive = focused || value !== '';

    return (
        <div className="textbox-container">
            <label
                className={`floating-label ${isLabelActive ? 'active' : ''}`}>{placeholder}</label>
            <div className="input-wrapper">
                <input
                    type={isPassword && !showPassword ? 'password' : 'text'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="textbox-input"
                />
                {isPassword && (
                    <button
                        type="button"
                        className="visibility-toggle"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label="Toggle password visibility"
                    >
                        {showPassword
                            ? React.createElement(FaEyeSlash as any, {size: 16})
                            : React.createElement(FaEye as any, {size: 16})}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TextBox;