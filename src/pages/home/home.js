import React, {useEffect, useState} from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/header/header';
import MasonrySlider from '../../components/masonry-slider/masonry-slider';
import './index.scss';
import Popup from "../../components/popup/popup";
import NoTrash from "../../components/no-trash/no-trash";

const HomePage = () => {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [reloadPosts, setReloadPosts] = useState(false);
    const [notes, setNotes] = useState([]);
    const [trashedPosts, setTrashedPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/wp-json/react-wp/v1/get-posts?category=${selectedCategory}`);

            if (response.status === 200) {
                const data = await response.json();
                setNotes(data);

                const trashed = data
                    .filter(post => post.category === 'trash')
                    .map(post => post.id);
                setTrashedPosts(trashed);
            }
        };

        getPosts();
    }, [selectedCategory, reloadPosts])

    return (
        <div className="homepage">
            <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div className="main-content">
                <Header
                    open={open}
                    setOpen={setOpen}
                    selectedCategory={selectedCategory}
                    trashedPosts={trashedPosts}
                    reloadPosts={reloadPosts}
                    setReloadPosts={setReloadPosts}
                />
                {notes.length > 0 ? (
                    <MasonrySlider
                        notes={notes}
                        selectedCategory={selectedCategory}
                        reloadPosts={reloadPosts}
                        setReloadPosts={setReloadPosts}
                    />
                ) : selectedCategory === 'trash' ? (
                    <NoTrash setSelectedCategory={setSelectedCategory} />
                ) : (
                    <h3>0 notes</h3>
                )}
                {open && (
                    <Popup
                        setOpen={setOpen}
                        open={open}
                        reloadPosts={reloadPosts}
                        setReloadPosts={setReloadPosts}
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
