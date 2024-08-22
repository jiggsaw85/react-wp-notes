import { ReactComponent as NoTrashIcon } from '../../images/no-trash.svg';
import React from "react";
import "./index.scss";

export default function NoTrash({setSelectedCategory}) {
    return (
        <div className="no-trash-wrapper">
            <NoTrashIcon />
            <p>You have no more notes in trash</p>
            <button onClick={() => {setSelectedCategory('all')}} className="all-notes">All Notes</button>
        </div>
    )
}