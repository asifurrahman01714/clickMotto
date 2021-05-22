import React from 'react';
import './Home.css';
// import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import GalleryReact from '../ImageGallery/GalleryReact';
const Home = () => {
   

    return (
       <>
        <div className="home ">
            <div className="container">
                <div style={{width: '70%', margin: 'auto'}} className="pt-4">
                    <h1 className="text-center text-white">Your local source of high quality images
                    and videos directly from their creators</h1>

                    <form action="">
                        <input type="search" class="form-control" placeholder="search photos and videos"/>
                    </form>
                </div>
            </div>

        </div>
        
        <GalleryReact></GalleryReact>
       </>
    );
};

export default Home;