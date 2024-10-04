import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = () => {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = Cookies.get('role');
        setRole(userRole);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get('/logout');

            if (response.status === 200) {
                // Clear cookies on the client side
                Cookies.remove('Token');
                Cookies.remove('role');
                Cookies.remove('user_id');
                Cookies.remove('email');

                navigate('/login');
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Gym Scheduler Management</h1>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>

                {role === 'admin' && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
                {(role === 'trainer') && <li ><Link to = "/schedule" >Schedule</Link ></li >}
                {role === 'trainee' && (
                    <>
                        <li><Link to="/all-schedule">All Schedule</Link></li>
                        <li><Link to="/booked-schedule">Booked Schedule</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </>
                )}


                {role ? (
                    <li>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </li>
                ) : (
                    <>
                        <li><Link to="/login" className="btn">Sign In</Link></li>
                        <li><Link to="/register" className="btn">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
