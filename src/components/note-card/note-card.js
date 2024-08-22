import React from 'react';
import './NoteCard.css';

const Index = ({ note }) => {
    return (
        <div className="note-card" style={{ backgroundColor: note.bgColor }}>
            {note.image ? (
                <img src={note.image} alt="Note" />
            ) : (
                <>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </>
            )}
        </div>
    );
};

export default Index;