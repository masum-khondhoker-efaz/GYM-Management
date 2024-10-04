import React from 'react';
import Layout from "../components/layouts/Layout.jsx";
import '../assets/loginregister.css';
import RegisterComponent from "../components/UserSigninSignup/RegisterComponent.jsx";



const RegistrationPage = () => {
    return (
        <Layout >
            <RegisterComponent />
        </Layout >
    );
};

export default RegistrationPage;