import React from 'react';
import { FaStickyNote, FaImage, FaLink, FaTrash } from 'react-icons/fa';
import './Sidebar.css';

const Index = () => {
    return (
        <nav className="sidebar">
            <div className="logo">M</div>
            <ul>
                <li><FaStickyNote /> All Notes</li>
                <li><FaImage /> Images</li>
                <li><FaLink /> Links</li>
                <li><FaTrash /> Trash</li>
            </ul>
        </nav>
    );
};

export default Index;
