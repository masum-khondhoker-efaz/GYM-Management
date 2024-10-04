import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableClassSchedule = () => {
    const [availableClasses, setAvailableClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookedClasses, setBookedClasses] = useState({}); // Track booked classes

    useEffect(() => {
        const fetchAvailableClasses = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await axios.get('/api/AllAvailableClassSchedule', {
                    headers: {
                        'role': 'trainee',
                        'user_id': user_id
                    }
                });

                setAvailableClasses(response.data.data || []);
            } catch (error) {
                setError('Error fetching available class schedules.');
                console.error('Error fetching available classes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailableClasses();
    }, []);

    // Handle booking a class
    const handleBookClass = async (classID) => {
        console.log("Booking class with ID:", classID);
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            setError('User ID not found. Please log in again.');
            return;
        }

        try {
            const response = await axios.post(`/api/BookClass/${classID}`, {}, {
                headers: {
                    'role': 'trainee',
                    'user_id': user_id
                }
            });

            if (response.data.status === "Success") {
                setBookedClasses((prev) => ({
                    ...prev,
                    [classID]: true
                }));
                setError('');
            }
        } catch (error) {
            setError(error.response?.data.message || 'Error booking class.');
            console.error('Error booking class:', error);
        }
    };

    return (
        <div className="available-class-schedule-container">
            <h2 className="available-class-schedule-header">All Available Class Schedules</h2>
            {loading ? (
                <p>Loading available class schedules...</p>
            ) : (
                <>
                    {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                    <table className="available-class-schedule-table">
                        <thead>
                        <tr>
                            <th>Class Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Max Trainees</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {availableClasses.length > 0 ? (
                            availableClasses.map((classItem, index) => (
                                <tr key={`${classItem.classDate}-${index}`}>
                                    <td>{new Date(classItem.classDate).toLocaleDateString()}</td>
                                    <td>{classItem.startTime}</td>
                                    <td>{classItem.endTime}</td>
                                    <td>{classItem.maxTrainees}</td>
                                    <td>
                                        {bookedClasses[classItem._id] ? (
                                            <span>Booked</span>
                                        ) : (
                                            <button onClick={() => handleBookClass(classItem._id)}>
                                                Book
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No available classes.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AvailableClassSchedule;
