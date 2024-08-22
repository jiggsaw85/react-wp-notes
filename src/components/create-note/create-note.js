import React from "react";

export default function CreateNote({setTitle, setDescription, note}) {
    return (
        <>
            <label>
                <span>TITLE</span>
                <input
                    onChange={(e) => {setTitle(e.target.value)}}
                    type="text"
                    name="title"
                    defaultValue={note ? note?.title : ''}
                />
            </label>
            <label>
                <span>NOTE</span>
                <textarea
                    onChange={(e) => {setDescription(e.target.value)}}
                    name="note"
                    rows={10}
                    defaultValue={note ? note?.content : ''}
                />
            </label>
        </>
    );
}