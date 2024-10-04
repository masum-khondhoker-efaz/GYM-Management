import React from 'react';
import Layout from "../components/layouts/Layout.jsx";
import '../assets/trainee.css';
import AvailableClassSchedule from "../components/TraineeComponent/AvailableClassSchedule.jsx";

const TraineePage = () => {
    return (
        <Layout >
            <AvailableClassSchedule />
        </Layout >
    );
};

export default TraineePage;