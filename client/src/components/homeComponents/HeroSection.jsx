import React from 'react';
import heroImage from '../../assets/images/heroimage.jpg';
import heroImage2 from '../../assets/images/hero2.png';


const HeroSection = () => {
    return (
        <div >
            <div className = "hero-section" >
                <div className = "hero-image" >
                    <img src = {heroImage} alt = "Gym" />
                </div >
                <div className = "hero-text" >
                    <h1 >Built to make your life easier</h1 >

                    <p >Explore a variety of classes, book your schedule, and achieve your fitness goals.</p >
                    <button className = "signup-button" >Sign Up</button >
                </div >
            </div >
            <div className = "hero-section" >
                <div className = "hero-text" style = {{paddingLeft: "250px"}} >
                    <h1 >Easy to use Gym Management Software</h1 >
                    <p >Explore a variety of classes, book your schedule, and achieve your fitness goals.</p >
                    <button className = "signup-button" >Book Schedule Today</button >
                </div >
                <div className = "hero-image" >
                    <img src = {heroImage2} alt = "Gym" style={{height:"450px",width:"800px"}}/>
                </div >
            </div >
        </div >
    );
};

export default HeroSection;
