import React from 'react';

const FetchExistingClass = ({ classSchedules, loading, error }) => {
    return (
        <div className="class-schedule-container">
            <h2 className="class-schedule-header">Class Schedules</h2>
            {loading ? (
                <p>Loading class schedules...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table className="class-schedule-table">
                    <thead>
                    <tr>
                        <th>Class Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Trainer Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {classSchedules.length > 0 ? (
                        classSchedules.map((schedule, index) => (
                            <tr key={index}>
                                <td>{new Date(schedule.classDate).toLocaleDateString()}</td>
                                <td>{schedule.startTime}</td>
                                <td>{schedule.endTime}</td>
                                <td>{schedule.trainerName || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No class schedules available.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FetchExistingClass;
