import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/login', { email, password });
            if (response.status === 200) {
                const { role, user_id } = response.data.data;

                Cookies.set('role', role);
                Cookies.set('user_id', user_id);
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('role', role);

                if (role === 'admin') {
                    navigate('/admin-dashboard');
                }
                else if (role === 'trainer') {
                    navigate('/schedule');
                }
                else {
                    navigate('/profile');
                }
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p className="error" aria-live="polite">{error}</p>}
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Having no account? <a href="/register" style={{ color: '#0A1D27' }}>Sign Up</a>
            </p>
        </div>
    );
};

export default LoginComponent;
