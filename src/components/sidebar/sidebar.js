import React, {useState} from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as AllNotes } from '../../images/all-notes.svg';
import { ReactComponent as Images } from '../../images/image.svg';
import { ReactComponent as Links } from '../../images/links.svg';
import { ReactComponent as Notes } from '../../images/notes.svg';
import { ReactComponent as Trash } from '../../images/trash.svg';
import './index.scss';
import {FaBars} from "react-icons/fa";

const Sidebar = ({selectedCategory, setSelectedCategory}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`hamburger-menu ${isOpen === true ? 'sidebar-opened' : ''}`} onClick={toggleSidebar}>
                <FaBars size={24} />
            </div>
            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="logo">
                    <Logo />
                </div>
                <hr/>
                <ul>
                    <li
                        onClick={() => {setSelectedCategory('all')}}
                        className={selectedCategory === 'all' ? 'active' : ''}
                    ><AllNotes /> All Notes</li>
                    <li
                        onClick={() => {setSelectedCategory('note')}}
                        className={selectedCategory === 'note' ? 'active' : ''}
                    ><Notes /> Notes</li>
                    <li
                        onClick={() => {setSelectedCategory('image')}}
                        className={selectedCategory === 'image' ? 'active' : ''}
                    ><Images /> Images</li>
                    <li
                        onClick={() => {setSelectedCategory('link')}}
                        className={selectedCategory === 'link' ? 'active' : ''}
                    ><Links /> Links</li>
                </ul>
                <hr/>
                <ul className="trash">
                    <li
                        onClick={() => {setSelectedCategory('trash')}}
                        className={selectedCategory === 'trash' ? 'active' : ''}
                    ><Trash /> Trash</li>
                </ul>
                <hr/>
            </nav>
        </>
    );
};

export default Sidebar;
