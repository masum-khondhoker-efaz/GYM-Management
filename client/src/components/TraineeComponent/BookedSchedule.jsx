import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookedSchedule = () => {
    const [classSchedules, setClassSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookedSchedules = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                if (!user_id) {
                    setError('User ID not found. Please log in again.');
                    return;
                }

                const response = await axios.get('/api/BookedClassSchedules', {
                    headers: {
                        role: 'trainee',
                        user_id: user_id,
                    },
                });
                setClassSchedules(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to load class schedules');
                setLoading(false);
            }
        };

        fetchBookedSchedules();
    }, []);

    const handleCancel = async (classID) => {
        if (!classID) {
            console.error('Invalid classID:', classID);
            return;
        }
        try {
            const user_id = localStorage.getItem('user_id');
            const response = await axios.post(`/api/CancelClassBooking/${classID}`, {}, {
                headers: {
                    role: 'trainee',
                    user_id: user_id,
                },
            });

            if (response.data.status === 'Success') {
                alert('Booking canceled successfully');
                setClassSchedules((prevSchedules) =>
                    prevSchedules.filter((schedule) => schedule._id !== classID)
                );
            } else {
                alert('Failed to cancel booking');
            }
        } catch (err) {
            alert('Failed to cancel booking');
            console.error('Cancel error:', err);
        }
    };

    if (loading) {
        return <p>Loading class schedules...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="booked-schedule-container">
            <h2>Your Booked Class Schedules</h2>
            {classSchedules && classSchedules.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Class Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {classSchedules.map((schedule) => (
                        <tr key={schedule._id}>
                            <td>{schedule.classDate}</td>
                            <td>{schedule.startTime}</td>
                            <td>{schedule.endTime}</td>
                            <td>
                                <button onClick={() => handleCancel(schedule._id)}>
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No booked classes available.</p>
            )}
        </div>
    );
};

export default BookedSchedule;
