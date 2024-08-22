import React from 'react';
import Index from '../components/sidebar/index';
import Index from '../components/header/header';
import Index from '../components/masonry-slider';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <Index />
            <div className="main-content">
                <Index />
                <Index />
            </div>
        </div>
    );
};

export default HomePage;
