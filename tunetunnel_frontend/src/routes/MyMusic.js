import React, { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import {Howl, Howler} from 'howler';
import IconText from '../components/shared/IconText';
import NavButton from '../components/shared/NavButton';
// import TextInput from '../components/shared/TextInput';
// import CloudinaryUpload from '../components/shared/CloudinaryUpload';
// import { makeAuthenticatedPostRequest } from '../utils/serverHelper';
import { makeAuthenticatedGetRequest } from '../utils/serverHelper';
// import { useNavigate } from 'react-router-dom'
import SingleSongCard from '../components/shared/SingleSongCard';
import Logged_in_container from '../containers/Logged_in_container';

const MyMusic = () => {
    const [songData,setSongData]=useState([])
    const [songPlayed,setSongPlayed]=useState(null)

    const playSound=(songSrc)=>{
        if(songPlayed){
            songPlayed.stop()
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
          });
          setSongPlayed(sound)  
          sound.play();
    }
    
    useEffect(()=>{
    const getdata=async()=>{

        const response=await makeAuthenticatedGetRequest('/song/get/mysongs');
        // console.log(response.data)
        setSongData(response.data)
    };
    getdata()
    },[])


    return (
<Logged_in_container currentRoute={"mymusic"}>
                {/* =============  main content start======== */}

                <div className='w-full h-fit mt-2 p-4'>
                    <h1 className='text-white text-lg font-bold'>My Music</h1>
                    <div className='space-y-3 overflow-y-auto'>
                    {
                        songData.map((item)=>{
                            return <SingleSongCard info={item} playSound={playSound}/>
                        })
                    }
                    </div>
                </div>
                {/* ==============main content end=========== */}
                </Logged_in_container>

    )
}

export default MyMusic