import React, { useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

const LoginPage = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const toggleForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    return (
        <div>
            <h2>Sign In</h2>
            {/* Existing sign in form code */}
            <div>
                {/* Password field and other fields */}
                <input type='password' placeholder='Password' />
                <button onClick={toggleForgotPassword}>Forgot Password?</button>
                {showForgotPassword && <ForgotPasswordForm />}
            </div>
            {/* Sign up form or button can go here */}
        </div>
    );
};

export default LoginPage;