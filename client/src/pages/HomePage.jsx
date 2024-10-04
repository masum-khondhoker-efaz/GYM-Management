import React from 'react';
import Layout from "../components/layouts/Layout.jsx";
import HeroSection from "../components/homeComponents/HeroSection.jsx";
import '../assets/home.css';

const HomePage = () => {
    return (
        <Layout >
            <HeroSection />
        </Layout >
    );
};

export default HomePage;