import React, {useState} from 'react';
import { ReactComponent as Link } from '../../images/link.svg';
import './index.scss';
import {colors} from "../helpers/colors";
import { ReactComponent as TrashNote } from '../../images/trash-note.svg';
import { FaEdit } from 'react-icons/fa';
import Swal from "sweetalert2";
import Popup from "../popup/popup";

const NoteCard = ({ note, reloadPosts, setReloadPosts }) => {
    const [openEdit, setOpenEdit] = useState();

    const openLink = (link) => {
        window.open(link, '_blank');
    }

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const openEditPopup = (e) => {
        e.stopPropagation();
        setOpenEdit(!openEdit)
    }

    const trashPost = async (e) => {
        e.stopPropagation();

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to trash this note",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, trash it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/wp-json/react-wp/v1/move-posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ids: [note.id],
                        target: 'trash',
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Note trashed successfully",
                    showConfirmButton: false,
                    timer: 3000
                });

                setReloadPosts(!reloadPosts);
            } catch (error) {
                console.error('Failed to trash post:', error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to trash note",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }
    };


    return (
        <>
            <div
                className={`note-card ${note.category} ${/\.(png|jpg|jpeg|svg)$/i.test(note.title) && 'image'}`}
                style={{ backgroundColor: randomColor }}
                onClick={() => {
                    if (note.category === 'link') {
                        openLink(note.title);
                    }
                }}
            >
                {note.category !== 'trash' && <FaEdit className="edit-post" onClick={(e) => openEditPopup(e)} />}
                {note.category !== 'trash' && <TrashNote className="remove-post" onClick={(e) => trashPost(e)} />}

                {note.category === 'image' || /\.(png|jpg|jpeg|svg)$/i.test(note.title) ? (
                    <img src={note.title} alt="Note" />
                ) : (
                    <>
                        <h3>{note.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: note.content }} />
                        {note.category === 'link' && <Link className="link" />}
                    </>
                )}
            </div>
            {openEdit && (
                <Popup
                    open={openEdit}
                    setOpen={setOpenEdit}
                    setReloadPosts={setReloadPosts}
                    reloadPosts={reloadPosts}
                    note={note}
                />
            )}
        </>
    );
};

export default NoteCard;