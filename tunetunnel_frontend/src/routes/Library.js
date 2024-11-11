import React, { useEffect, useState } from 'react';
import Logged_in_container from '../containers/Logged_in_container';
import { Icon } from '@iconify/react/dist/iconify.js';
import { makeAuthenticatedGetRequest } from '../utils/serverHelper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Library = () => {


    const [myPlaylists, setMyPlaylists] = useState([]);
    const navigate=useNavigate()
    const getData = async () => {
        try {
            const response = await makeAuthenticatedGetRequest("/playlist/get/myplaylist");

            console.log("Full response:", response); // Log the response structure
            setMyPlaylists(response); // Use response structure based on console log
        } catch (error) {
            console.error("Failed to fetch playlists:", error);
            setMyPlaylists([]); // Optionally reset to an empty array on error
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await makeAuthenticatedGetRequest("/playlist/get/myplaylist");

                // console.log("Full response:", response); // Log the response structure
                setMyPlaylists(response); // Use response structure based on console log
            } catch (error) {
                console.error("Failed to fetch playlists:", error);
                setMyPlaylists([]); // Optionally reset to an empty array on error
            }
        };
        getData();
        //eslint-disable-next-line
    }, []);

    return (
        <Logged_in_container currentRoute={'library'}>
            <div className='text-gray-300 font-bold text-xl p-3 mt-3 flex justify-between'>
                My Library
                <button onClick={(e)=>{getData()
                    
                    toast.success("refreshed")}} className='p-2 ml-3 bg-gray-800 rounded-full'>
                <Icon icon="bx:refresh"  style={{color: "#a6e2b8"}} />
                </button>
        </div>
            <div className="p-3 grid gap-2 grid-cols-2 md:grid-4 md:grid-cols-5">
                {myPlaylists.map((item) => (
                    <Card
                    key={JSON.stringify(item)}
                    title={item.name}
                    description=""
                    imgUrl={item.thumbnail}
                        playlistId={item._id}
                    />
                ))} 
            </div>
        </Logged_in_container>
    );
};

const Card = ({title, description, imgUrl, playlistId}) => {
    const navigate=useNavigate()
    return (
        <div
            className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
            onClick={() => {
                navigate("/playlist/" + playlistId);
            }}
        >
            <div className="pb-4 pt-2">
                <img className="w-full h-36 rounded-md" src={imgUrl || "https://unsplash.com/illustrations/a-woman-standing-in-front-of-a-radio-Va_H3SaiPRU"} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default Library;
