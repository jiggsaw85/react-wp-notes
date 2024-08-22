import React from 'react';
import './index.scss';
import Swal from "sweetalert2";

const Header = ({open, setOpen, selectedCategory, trashedPosts, reloadPosts, setReloadPosts}) => {
    const categoryTitles = {
        all: 'All Notes',
        note: 'Notes',
        image: 'Images',
        link: 'Links',
        trash: 'Trash',
    };

    const clearTrash = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to clear trash",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/wp-json/react-wp/v1/delete-posts`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ids: trashedPosts,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setReloadPosts(!reloadPosts);

                Swal.fire({
                    title: "Cleared!",
                    text: "Trash successfully cleared.",
                    icon: "success"
                });
            } catch (error) {
                console.error('Failed to clear trash:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to clear trash.",
                    icon: "error"
                });
            }
        }
    }

    return (
        <header className="header">
            <h1>{categoryTitles[selectedCategory]}</h1>

            {selectedCategory !== 'trash'
                ?
                    <button onClick={() => setOpen(!open)} className="add-new">Add New</button>
                :
                    <button onClick={() => clearTrash()} className="add-new trash">Clear Trash</button>
            }
        </header>
    );
};

export default Header;
