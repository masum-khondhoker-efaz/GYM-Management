import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileComponent = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            const userId = localStorage.getItem('user_id');
            const role = localStorage.getItem('role');

            if (!userId || role !== 'trainee') {
                setError('Unauthorized access. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('/api/Profile', {
                    headers: {
                        'role': 'trainee',
                        'user_id': userId,
                    }
                });

                if (response.data.status === "Success") {
                    setProfileData(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError(error.response?.data.message || 'Error fetching profile data.');
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="profile-container">
            <h2 className="profile-header">Trainee Profile</h2>
            {loading ? (
                <p>Loading profile...</p>
            ) : (
                <>
                    {error ? (
                        <div className="error-message" style={{ color: 'red' }}>
                            {error}
                        </div>
                    ) : (
                        <div className="profile-details">
                            <p><strong>Name:</strong> {profileData?.name}</p>
                            <p><strong>Email:</strong> {profileData?.email}</p>
                            <p><strong>Age:</strong> {profileData?.age}</p>
                            <p><strong>Phone:</strong> {profileData?.phone}</p>
                            <p><strong>Weight:</strong> {profileData?.weight}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
export default ProfileComponent;
