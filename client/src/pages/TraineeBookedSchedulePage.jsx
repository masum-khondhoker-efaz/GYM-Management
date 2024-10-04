import React from 'react';
import Layout from "../components/layouts/Layout.jsx";
import BookedSchedule from "../components/TraineeComponent/BookedSchedule.jsx";
import '../assets/bookedSchedule.css';

const TraineeBookedSchedulePage = () => {
    return (
        <Layout >
            <BookedSchedule />
        </Layout >
    );
};

export default TraineeBookedSchedulePage;