import React from 'react';
import { useRouter } from 'next/router';

const ResetPasswordPage: React.FC = () => {
    const router = useRouter();
    const { token } = router.query;

    if (!token) {
        return <div>Error: Reset token is missing!</div>;
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle password reset logic here
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="New password" required />
                <input type="password" placeholder="Confirm new password" required />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;