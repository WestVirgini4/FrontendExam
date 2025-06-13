import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import '../components/UserRegisterForm.css';

const UserRegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [submit, setSubmit] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) =>
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
                return !value.trim() ? 'First name required' : value.length < 2 ? 'First name must be at least 2 characters' : '';
            case 'lastName':
                return !value.trim() ? 'Last name required' : value.length < 2 ? 'Last name must be at least 2 characters' : '';
            case 'email':
                return !value.trim() ? 'Email required' : !validateEmail(value) ? 'Invalid email' : '';
            case 'password':
                return !value.trim() ? 'Password required' : !validatePassword(value) ? 'Invalid password must be at least 8 characters and contain A-Z, a-z, 0-9' : '';
            case 'confirmPassword':
                return !value.trim() ? 'Confirm password required' : value !== formData.password ? 'Passwords do not match' : '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const fieldError = validateField(name, value);
        setError(prev => ({ ...prev, [name]: fieldError }));

        if (name === 'password' && formData.confirmPassword) {
            const confirmError = validateField('confirmPassword', formData.confirmPassword);
            setError(prev => ({ ...prev, confirmPassword: confirmError }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newError = {};

        Object.keys(formData).forEach(key => {
            const fieldError = validateField(key, formData[key]);
            if (fieldError) newError[key] = fieldError;
        });

        setError(newError);

        if (Object.keys(newError).length === 0) {
            setSubmit(true);
            console.log('Form submitted', formData);
            setTimeout(() => {
                setSubmit(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }, 3000);
        }
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        return strength;
    };

    const getStrengthClass = (strength) =>
        strength <= 2 ? 'strength-weak' : strength <= 3 ? 'strength-medium' : strength <= 4 ? 'strength-good' : 'strength-strong';

    const getStrengthText = (strength) =>
        strength <= 2 ? 'weak' : strength <= 3 ? 'normal' : strength <= 4 ? 'good' : 'strong';

    if (submit) {
        return (
            <div className="register-container">
                <div className="success-card">
                    <CheckCircle className="success-icon" />
                    <h2 className="success-title">Registration Successful</h2>
                    <p className="success-message">Your information has been saved.</p>
                </div>
            </div>
        );
    }

    const passwordStrength = getPasswordStrength(formData.password);
    const isDarkMode = document.body.classList.contains("dark");

    return (
        <div className={`register-container`}>
             <div className={`register-card ${isDarkMode ? 'dark' : ''}`}>
                <div className="register-header">
                    <div className="header-icon"><User className="user-icon" /></div>
                    <h1 className="header-title">Register</h1>
                    <p className="header-subtitle">Create your account</p>
                </div>

                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name <span className="required">*</span></label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`form-input ${error.firstName ? 'input-error' : ''}`}
                            placeholder="Write your name"
                        />
                        {error.firstName && <div className="error-message"><AlertCircle className='error-icon' />{error.firstName}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Surname <span className="required">*</span></label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`form-input ${error.lastName ? 'input-error' : ''}`}
                            placeholder="Write your surname"
                        />
                        {error.lastName && <div className="error-message"><AlertCircle className='error-icon' />{error.lastName}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email <span className="required">*</span></label>
                        <div className="input-with-icon">
                            <Mail className='input-icon' />
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${error.email ? 'input-error' : ''}`}
                                placeholder="example@email.com"
                            />
                        </div>
                        {error.email && <div className="error-message"><AlertCircle className='error-icon' />{error.email}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password <span className="required">*</span></label>
                        <div className="input-with-icon">
                            <Lock className='input-icon' />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className={`form-input ${error.password ? 'input-error' : ''}`}
                                placeholder="Write your password"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                                {showPassword ? <EyeOff className='toggle-icon' /> : <Eye className='toggle-icon' />}
                            </button>
                        </div>
                        {formData.password && (
                            <div className={`password-strength ${getStrengthClass(passwordStrength)}`}>
                                <div className="strength-bar">
                                    <div className="strength-fill" style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
                                </div>
                                <span className="strength-text">{getStrengthText(passwordStrength)}</span>
                            </div>
                        )}
                        {error.password && <div className="error-message"><AlertCircle className='error-icon' />{error.password}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password <span className="required">*</span></label>
                        <div className="input-with-icon">
                            <Lock className='input-icon' />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`form-input ${error.confirmPassword ? 'input-error' : ''}`}
                                placeholder="Confirm your password"
                            />
                        </div>
                        {error.confirmPassword && <div className="error-message"><AlertCircle className='error-icon' />{error.confirmPassword}</div>}
                    </div>

                    <button type="submit" className="submit-button">Register</button>
                </form>

                <div className="footer-text">
                    <p>
                        Already have an account? <a href="#" className="login-link">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserRegisterForm;
