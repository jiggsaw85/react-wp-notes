import React from "react";

export default function LinkNote({setTitle, setDescription}) {
    return (
        <label>
            <span>LINK URL</span>
            <input onChange={(e) => {setTitle(e.target.value)}} type="text" name="link"/>
        </label>
    );
}