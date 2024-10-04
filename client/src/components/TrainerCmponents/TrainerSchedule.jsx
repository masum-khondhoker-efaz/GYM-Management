import React, {useEffect, useState} from 'react';
import axios from "axios";

const TrainerSchedule = () => {
    const [assignedClasses, setAssignedClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssignedClasses = async () => {
            try {
                const response = await axios.get('/api/GetTrainerAssignedClasses', {
                    headers: {
                        role: 'trainer',
                        user_id: 'YOUR_USER_ID'
                    }
                });
                setAssignedClasses(response.data.data || []);
            } catch (error) {
                setError('Error fetching assigned classes.');
                console.error('Error fetching assigned classes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignedClasses();
    }, []);

    return (
        <div className="assigned-classes-container">
            <h2 className="assigned-classes-header">Assigned Classes</h2>
            {loading ? (
                <p>Loading assigned classes...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table className="assigned-classes-table">
                    <thead>
                    <tr>
                        <th>Class Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Number of Trainees</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assignedClasses.length > 0 ? (
                        assignedClasses.map((assignedClass, index) => (
                            <tr key={index}>
                                <td>{new Date(assignedClass.classDate).toLocaleDateString()}</td>
                                <td>{assignedClass.startTime}</td>
                                <td>{assignedClass.endTime}</td>
                                <td>{assignedClass.numberOfTrainees}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No assigned classes available.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TrainerSchedule;