import React, { useState } from 'react';
import TextInput from '../components/shared/TextInput';
import { makeAuthenticatedPostRequest } from '../utils/serverHelper';
import { toast } from 'react-toastify';

const CreatePlay = ({ closeModal }) => {
  const [playlistTitle, setPlayListTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');



  const createPlaylist = async () => {
    try {
      const response = await makeAuthenticatedPostRequest('/playlist/create', {
        name: playlistTitle, 
        thumbnail: thumbnail, 
        songs: []
      });
      
      if (response.data && response.data._id) {

        toast.success('🎉 Playlist created successfully!');
        closeModal(); // Close modal
      } else {
        toast.error('Failed to create playlist.'); // Handle failure case
      }
    } catch (error) {
      toast.error('An error occurred while creating the playlist.');
    }
  };

  return (
    <div 
      className="absolute w-screen h-screen z-40 backdrop-blur-sm bg-green/30 flex justify-center items-center" 
      onClick={closeModal}
    >
      <div
        className="relative drop-shadow-xl w-60 md:w-1/3 h-64 overflow-hidden rounded-xl bg-[#2e2c2e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 absolute flex flex-col items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#252425]">
          <div className='text-green-400 font-bold text-xl mb-2'>Create Your Playlist</div>
          <TextInput 
            placeholder="Enter playlist name" 
            label="Playlist Name"
            labelColor="white" 
            value={playlistTitle} 
            setValue={setPlayListTitle}
          />
          <TextInput 
            placeholder="Select Thumbnail" 
            label="Thumbnail"
            labelColor="white" 
            value={thumbnail} 
            setValue={setThumbnail}
          />

          <button
            className="group cursor-pointer outline-none hover:rotate-90 duration-300 m-2"
            title="Add New" 
            onClick={createPlaylist}
          >
            <svg
              className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
              viewBox="0 0 24 24"
              height="40px"
              width="40px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="1.5"
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              ></path>
              <path strokeWidth="1.5" d="M8 12H16"></path>
              <path strokeWidth="1.5" d="M12 16V8"></path>
            </svg>
          </button>
        </div>
        <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
      </div>
    </div>
  )
}

export default CreatePlay;
