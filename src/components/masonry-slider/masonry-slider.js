import React from 'react';
import Masonry from 'react-masonry-css';
import NoteCard from './NoteCard';
import './MasonrySlider.css';

const MasonrySlider = () => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    const notes = [
        { title: 'WooCommerce', content: 'WooCommerce has grown to become...', bgColor: '#d7efff' },
        { title: '', content: '', image: 'path_to_image.jpg' },
        { title: 'Built on WordPress', content: 'WooCommerce is an extension...', bgColor: '#ffccc7' },
    ];

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
        >
            {notes.map((note, index) => (
                <NoteCard key={index} note={note} />
            ))}
        </Masonry>
    );
};

export default MasonrySlider;
