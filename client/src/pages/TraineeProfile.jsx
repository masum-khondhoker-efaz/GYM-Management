import React from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProfileComponent from "../components/TraineeComponent/ProfileComponent.jsx";
import '../assets/profile.css';


const TraineeProfile = () => {
    return (
        <Layout >
            <ProfileComponent />
        </Layout >
    );
};

export default TraineeProfile;