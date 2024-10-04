import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateClassScheduleComponent = ({ onClassScheduleCreated }) => {
    const [classDate, setClassDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [trainerID, setTrainerID] = useState('');
    const [trainers, setTrainers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch trainers on component mount
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('/api/GetAllTrainer');
                setTrainers(response.data.data || []);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };

        fetchTrainers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formattedStartTime = startTime.includes("AM") || startTime.includes("PM")
            ? startTime
            : new Date(`1970-01-01T${startTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        try {
            const response = await axios.post('/api/CreateClassSchedule', {
                classDate,
                startTime: formattedStartTime,
                trainerID
            });

            if (response.data.status === "Success") {
                setSuccess('Class scheduled successfully.');
                setClassDate('');
                setStartTime('');
                setTrainerID('');
                onClassScheduleCreated();
            }
        } catch (error) {
            setError(error.response?.data.message || 'Error creating class schedule.');
            console.error('Error creating class schedule:', error);
        }
    };

    return (
        <div className="create-class-schedule-container">
            <h2 className="create-class-schedule-header">Create Class Schedule</h2>
            <form className="create-class-schedule-form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Class Date:
                    <input
                        type="date"
                        className="form-input"
                        value={classDate}
                        onChange={(e) => setClassDate(e.target.value)}
                        required
                    />
                </label>
                <label className="form-label">
                    Start Time:
                    <input
                        type="time"
                        className="form-input"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </label>
                <label className="form-label">
                    Trainer:
                    <select
                        className="form-input"
                        value={trainerID}
                        onChange={(e) => setTrainerID(e.target.value)}
                        required
                    >
                        <option value="">Select a trainer</option>
                        {trainers.map((trainer) => (
                            <option key={trainer._id} value={trainer._id}>
                                {trainer.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" className="create-class-schedule-button">Create Schedule</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default CreateClassScheduleComponent;
