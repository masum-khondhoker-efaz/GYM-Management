import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageTrainerComponent = () => {
    const [trainers, setTrainers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [editingTrainerId, setEditingTrainerId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await axios.get('/api/GetAllTrainer');
            console.log(response.data);
            if (Array.isArray(response.data.data)) {
                setTrainers(response.data.data);
            } else {
                console.error('Expected an array, but got:', response.data.data);
                setTrainers([]);
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTrainerId) {
                await axios.post(`/api/UpdateTrainer/${editingTrainerId}`, formData);
            } else {
                await axios.post('/api/CreateTrainer', formData);
            }
            setFormData({ name: '', email: '', password: '' });
            setEditingTrainerId(null);
            fetchTrainers();
        } catch (error) {
            console.error('Error saving trainer:', error);
        }
    };

    const handleEdit = (trainer) => {
        setFormData({ name: trainer.name, email: trainer.email, password: '' });
        setEditingTrainerId(trainer._id);
    };

    const handleDelete = async (trainerId) => {
        try {
            await axios.post(`/api/DeleteTrainer/${trainerId}`);
            fetchTrainers();
        } catch (error) {
            console.error('Error deleting trainer:', error);
        }
    };

    return (
        <div className="manage-trainer-container">
            <h2 className="manage-trainer-header">Manage Trainers</h2>

            {/* Trainer Form */}
            <form className="manage-trainer-form" onSubmit={handleSubmit}>
                <input
                    className="manage-trainer-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Trainer Name"
                    required
                />
                <input
                    className="manage-trainer-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Trainer Email"
                    required
                />
                <input
                    className="manage-trainer-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required={!editingTrainerId}
                />
                <button className="manage-trainer-button" type="submit">
                    {editingTrainerId ? 'Update Trainer' : 'Add Trainer'}
                </button>
            </form>

            {/* Trainer Table */}
            <div>
                {loading ? (
                    <p>Loading trainers...</p>
                ) : (
                    <table className="manage-trainer-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trainers.map((trainer) => (
                            <tr key={trainer._id}>
                                <td>{trainer.name}</td>
                                <td>{trainer.email}</td>
                                <td>
                                    <button className="manage-trainer-button" onClick={() => handleEdit(trainer)}>Edit</button>
                                    <button className="manage-trainer-delete-button" onClick={() => handleDelete(trainer._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManageTrainerComponent;
