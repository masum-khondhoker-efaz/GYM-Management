import React from 'react';
import Layout from "../components/layouts/Layout.jsx";
import TrainerSchedule from "../components/TrainerCmponents/TrainerSchedule.jsx";
import '../assets/trainer.css';

const TrainerPage = () => {
    return (
        <Layout >
            <TrainerSchedule />
        </Layout >
    );
};

export default TrainerPage;