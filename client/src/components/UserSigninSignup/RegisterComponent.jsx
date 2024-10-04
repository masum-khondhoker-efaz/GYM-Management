import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', formData);
            if (response.status === 201) {
                setSuccessMessage('Registration successful! Redirecting to login...');
                setError(null);
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-form-title">Sign Up</h2>
            <form onSubmit={handleSubmit} className="register-form">
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="register-button">Sign Up</button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Already have an account? <a href="/login" style={{ color: '#0A1D27' }}>Sign In</a>
            </p>
        </div>
    );
};

export default Register;
