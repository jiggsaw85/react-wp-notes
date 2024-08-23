import React from 'react';
import Masonry from 'react-masonry-css';
import NoteCard from '../note-card/note-card';
import './index.scss';

const MasonrySlider = ({ notes, selectedCategory, reloadPosts, setReloadPosts }) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    const filteredNotes = selectedCategory === 'all'
        ? notes.filter(note => note.category !== 'trash')
        : notes.filter(note => note.category === selectedCategory);

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
        >
            {filteredNotes.map((note, index) => (
                <NoteCard key={index} note={note} reloadPosts={reloadPosts} setReloadPosts={setReloadPosts} />
            ))}
        </Masonry>
    );
};

export default MasonrySlider;
