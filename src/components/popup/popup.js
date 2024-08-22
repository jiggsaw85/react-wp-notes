import React, {useState} from "react";
import './index.scss';
import { ReactComponent as NoteIcon } from '../../images/note-icon.svg';
import { ReactComponent as ImageIcon } from '../../images/image-icon.svg';
import { ReactComponent as LinkIcon } from '../../images/link-icon.svg';
import Swal from "sweetalert2";
import CreateNote from "../create-note/create-note";
import LinkNote from "../create-note/link-note";
import ImageNote from "../create-note/image-note";

export default function Popup({setOpen, open, setReloadPosts, reloadPosts, note}) {
    const [selectedCategory, setSelectedCategory] = useState('note');
    const [title, setTitle] = useState(note ? note?.title : '');
    const [description, setDescription] = useState(note ? note?.content : '');

    const updatePost = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/wp-json/react-wp/v1/edit-post/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: note.id,
                title: title,
                description: description,
                category: note.category,
            }),
        });

        const data = await response.json();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Note updated successfully",
            showConfirmButton: false,
            timer: 3000
        });

        setReloadPosts(!reloadPosts)
        setOpen(false);
    };

    const createPost = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/wp-json/react-wp/v1/create-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: selectedCategory,
                    title: title,
                    description: description,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Note created successfully",
                showConfirmButton: false,
                timer: 3000
            });

            setReloadPosts(!reloadPosts)
            setOpen(false);

        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return (
        <div className="popup">
            <h3>
                {note ? "Edit Note" : "Add Note"}
            </h3>
            <p>What kind of note would you like to add?</p>
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        name="options"
                        value="note"
                        disabled={note}
                        checked={note ? note?.category === 'note' : selectedCategory === 'note'}
                        onChange={() => {setSelectedCategory('note')}}
                    />
                    <NoteIcon className="icon" />
                    <span>Note</span>
                </label>

                <label>
                    <input
                        type="radio"
                        name="options"
                        value="image"
                        disabled={note}
                        checked={note ? note?.category === 'image' : selectedCategory === 'image'}
                        onChange={() => {setSelectedCategory('image')}}
                    />
                    <ImageIcon className="icon" />
                    <span>Image</span>
                </label>

                <label>
                    <input
                        type="radio"
                        name="options"
                        value="link"
                        disabled={note}
                        checked={note ? note?.category === 'link' : selectedCategory === 'link'}
                        onChange={() => {setSelectedCategory('link')}}
                    />
                    <LinkIcon className="icon" />
                    <span>Link</span>
                </label>
            </div>
            <div className="form">
                {note ? (
                    note.category === 'note' ? (
                        <CreateNote setTitle={setTitle} setDescription={setDescription} note={note} />
                    ) : note.category === 'link' ? (
                        <LinkNote setTitle={setTitle} note={note} />
                    ) : note.category === 'image' ? (
                        <ImageNote setTitle={setTitle} note={note} />
                    ) : null
                ) : (
                    selectedCategory === 'note' ? (
                        <CreateNote setTitle={setTitle} setDescription={setDescription} note={note} />
                    ) : selectedCategory === 'link' ? (
                        <LinkNote setTitle={setTitle} note={note} />
                    ) : selectedCategory === 'image' ? (
                        <ImageNote setTitle={setTitle} note={note} />
                    ) : null
                )}
            </div>
            <div className="buttons">
                <span onClick={() => setOpen(false)}>Cancel</span>
                <button onClick={() => {note ? updatePost() : createPost()}} className="add-new">
                    {note ? "Edit" : "Add New"}
                </button>
            </div>
        </div>
    );
}