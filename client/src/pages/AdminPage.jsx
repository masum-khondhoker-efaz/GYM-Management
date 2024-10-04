import React, { useState, useEffect } from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ManageTrainerComponent from "../components/AdminComponents/ManageTrainerComponent.jsx";
import "../assets/admin.css"
import FetchExistingClass from "../components/AdminComponents/FetchExistingClass.jsx";
import CreateClassScheduleComponent from "../components/AdminComponents/CreateClassScheduleComponent.jsx";
import axios from 'axios';

const AdminPage = () => {
    const [classSchedules, setClassSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchClassSchedules = async () => {
        try {
            const response = await axios.get('/api/AllClassSchedule');
            setClassSchedules(response.data.data || []);
        } catch (error) {
            setError('Error fetching class schedules.');
            console.error('Error fetching class schedules:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClassSchedules();
    }, []);

    // Callback to refresh class schedules
    const handleClassScheduleCreated = () => {
        fetchClassSchedules();
    };

    return (
        <Layout>
            <ManageTrainerComponent />
            <FetchExistingClass classSchedules={classSchedules} loading={loading} error={error} />
            <CreateClassScheduleComponent onClassScheduleCreated={handleClassScheduleCreated} />
        </Layout>
    );
};

export default AdminPage;
