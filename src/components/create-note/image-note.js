import React from "react";

export default function ImageNote({setTitle, setDescription, note}) {
    return (
        <label>
            <span>IMAGE URL</span>
            <input
                onChange={(e) => {setTitle(e.target.value)}}
                type="text"
                name="image"
                defaultValue={note ? note?.title : ''}
            />
        </label>
    );
}