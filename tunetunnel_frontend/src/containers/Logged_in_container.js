import React, { useContext, useLayoutEffect, useRef, useState ,useEffect} from 'react';
import { Howler, Howl } from 'howler';
import { Icon } from "@iconify/react";
import IconText from '../components/shared/IconText';
import Navbar from '../components/shared/Navbar';
import Playlistview from '../components/Pages/Playlistview';
import NavButton from '../components/shared/NavButton';
import songContext from '../contexts/songContext';
import CreatePlay from '../modals/CreatePlay';
import { Link } from 'react-router-dom';
import AddToPlaylist from '../modals/AddToPlaylist';
import { makeAuthenticatedPostRequest } from '../utils/serverHelper';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Logged_in_container = ({children,currentRoute}) => {

    // const [songPlayed, setSongPlayed] = useState(null)
    // const [isPaused,setPaused]=useState(true)
    const [cookie,setCookie,removeCookie]=useCookies(["token"])
    const [createPlaylistModal,setCreatePlaylistModal]=useState(false)
    const [addToPlaylistSong,setAddToPlaylistSong]=useState(false)
    const {currentSong,setCurrentsong,songPlayed,setSongPlayed,isPaused,setPaused}=useContext(songContext)
    const firstUpdate=useRef(true)

    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1); // Max volume by default
    const [playbackRate, setPlaybackRate] = useState(1); // Normal speed
    // const firstUpdate = useRef(true);
    const progressInterval = useRef(null);
    const navigate=useNavigate()

    // console.log(currentSong)
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (!currentSong) return;
        changeSong(currentSong.track);
    }, [currentSong]);

    const handleLogout=()=>{
        if (songPlayed) {
            songPlayed.stop();
            clearInterval(progressInterval.current);
        }
       removeCookie('token',{path:'/'});
       
       navigate('/login')
    }

    const addSongToPlaylist=async(playlistId)=>{
try{
    const songId=currentSong._id 
    const payload = {songId,playlistId}
    // console.log(payload)
    const response=await makeAuthenticatedPostRequest("/playlist/add/song/",payload)
    console.log(response)
    if (response.success){
        toast.success("🎵 Song successfully added to playlist....")
        setAddToPlaylistSong(false)
    }
}catch(error){
console.log(error)
}
    }

    useEffect(() => {
        return () => {
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, []);

    const updateProgress = () => {
        if (songPlayed && !isPaused) {
            setProgress(songPlayed.seek());
            setDuration(songPlayed.duration());
        }
    };

    const playSound = () => {
        if (songPlayed) {
            songPlayed.play();
            setPaused(false);
            progressInterval.current = setInterval(updateProgress, 1000);
        }
    };

    const changeSong = (songSrc) => {
        if (songPlayed) {
            songPlayed.stop();
            clearInterval(progressInterval.current);
        }
        const sound = new Howl({
            src: [songSrc],
            html5: true,
            volume: volume,
            rate: playbackRate,
            onend: () => setPaused(true),
        });
        setSongPlayed(sound);
        setDuration(sound.duration());
        sound.play();
        setPaused(false);
        progressInterval.current = setInterval(updateProgress, 1000);
    };

    const pausedSound = () => {
        if (songPlayed) {
            songPlayed.pause();
            setPaused(true);
            clearInterval(progressInterval.current);
        }
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
        } else {
            pausedSound();
        }
    };

    const handleSeekChange = (e) => {
        const newProgress = e.target.value;
        setProgress(newProgress);
        if (songPlayed) {
            songPlayed.seek(newProgress);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        Howler.volume(newVolume);
    };

    const handlePlaybackRateChange = (e) => {
        const newRate = e.target.value;
        setPlaybackRate(newRate);
        if (songPlayed) {
            songPlayed.rate(newRate);
        }
    };

    return (
        <div className='w-full h-full absolute overflow-y-hidden'>
            {createPlaylistModal && <CreatePlay closeModal={()=>{setCreatePlaylistModal(false)}}/>}
            {addToPlaylistSong && <AddToPlaylist closeModal={()=>{setAddToPlaylistSong(false)}} addSongToPlaylist={addSongToPlaylist}/>}
            
            <div className={`${currentSong ? "h-8/10 md:h-9/10":"h-full"} w-full flex`}>
                <div className='resize-x overflow-auto h-full min-w-18 sm:min-w-70 bg-black flex flex-col p-2'>
                    <div className='h-fit w-full flex flex-row justify-center items-center mb-3'>
                        <Icon icon="simple-icons:audioboom" width="54" height="54" style={{ color: '#1ebe30' }} />
                        <h2 className='font-bold hidden sm:block text-white pl-3 text-2xl'>TuneTunnel</h2>
                    </div>
                    <div className='pl-2 sm:pl-6 mt-16 mb-2' >
                        <IconText iconname={'fluent:home-24-filled'} label={'Home'} targetLink={'/home'} active={currentRoute==="home"} />
                    </div>
                    <div className='pl-2 sm:pl-6  mb-2 '>
                        <IconText iconname={'mingcute:search-3-fill'} label={'Search'} targetLink={'/search'} active={currentRoute==="search"}/>
                    </div>
                    <div className='pl-2 sm:pl-6 mb-2'>
                        <IconText iconname={'solar:music-library-2-bold'} label={'Library'} targetLink={'/library'} active={currentRoute==="library"}/>
                    </div>
                    <div className='pl-2 sm:pl-6 mb-2'>
                        <IconText iconname={'fluent-emoji-flat:red-heart'} label={'Favourite'} active={currentRoute==="favourite"}/>
                    </div>
                    <div className='pl-2 sm:pl-6 mb-2'>
                        <IconText iconname={'flat-color-icons:music'} label={'My songs'} targetLink={'/mymusic'} active={currentRoute==="mymusic"}/>
                    </div>

                    {/* Full element for larger screens */}
                    <div className="relative group hidden sm:block">
                        <div className="relative w-58 h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10">
                            <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"></div>
                            <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black">
                                <button
                                    name="text"
                                    className="input font-semibold text-md h-full opacity-90 w-full px-16 py-3 rounded-xl bg-black "
                                onClick={(e)=>{setCreatePlaylistModal(true)}}
                                >
                                    Play Lists
                                </button>
                            </div>
                            <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-green-500 to-yellow-500 blur-[30px]"></div>
                        </div>
                    </div>

                    {/* Icon for mobile screens */}
                    <div className="relative group sm:hidden">
                        <div className="relative w-14 h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10 flex items-center justify-center">
                            <Icon icon="mdi:playlist-music" width="24" height="24" style={{ color: 'white' }} 
                            onClick={()=>{setCreatePlaylistModal(true)}}
                            />
                        </div>
                    </div>

                </div>
                <div className='flex-1 w-full justify-between overflow-y-auto' style={{ backgroundColor: '#141414', color: 'white' }}>


                    {/* ======nav===== */}
                    {/* <Navbar mainbutton={'Logout'}/> */}
                    <div className='w-full flex bg-gray-950 sticky top-0  justify-between items-center rounded-md' style={{ height: '10%' }}>
                        <div className='flex justify-between'>
                            <Icon icon="raphael:arrowleft" width="24" height="24" style={{ color: 'white' }} />
                            <Icon icon="raphael:arrowright" width="24" height="24" style={{ color: 'white' }} />
                        </div>
                        <div className='flex items-center'>
                            {/* <NavButton label={'Premium'}  /> */}
                            <Icon icon="mingcute:notification-fill" width="24" height="24" style={{ color: 'white' }} className='sm:hidden' />
                            <div className='hidden sm:block'><NavButton label={'Notification'} /></div>

                           <Link to='/uploadsong'><NavButton label={'Upload'}  /></Link> 
                            <div className='hidden sm:block p-2 mx-2 border-r-2 border-gray-300'></div>
                            <button class="hover:brightness-110 hover:animate-pulse font-bold mr-3 py-1 px-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white" onClick={handleLogout}>Logout</button>
                        </div>

                    </div>

                    {/* ======navend===== */}

                    <div className='w-full h-fit overflow-y-auto'>
                        {children}
                    </div>

                </div>
            </div>
            {/* =========bottom play bar============== */}
            {/* { currentSong && 
            <div className='w-full h-1/10  p-0 m-0 bg-gray-900 text-white flex items-center'>
                <div className='w-1/4 flex items-center'>
                    <img
                        src={currentSong.thumbnail}
                        className='h-4 w-4 md:h-14 md:w-14 rounded-lg m-2'
                    ></img>
                    <div className='pl-1 md:pl-4'>
                        <div className='text-xs md:text-sm hover:underline cursor-pointer'>
                            {currentSong.name}
                        </div>
                        <div className='text-xs md:text-xs hover:underline cursor-pointer text-gray-500'>
                            {currentSong.artist.firstName+ " "+currentSong.artist.lastName}
                        </div>
                    </div>
                </div>
                <div className='w-1/2 h-full flex justify-center flex-col items-center'>

                    <div className='flex w-1/2 md:1/2 justify-evenly'>
                        <Icon icon="icon-park-outline:shuffle-one" width="24" height="24" style={{ color: "#00f56a" }} fontSize={20} />
                        <Icon icon="solar:skip-previous-bold" style={{ color: "#00f56a" }} fontSize={20} />
                        <Icon className='cursor-pointer' icon={isPaused?"ic:baseline-play-circle":"ic:baseline-pause-circle"} fontSize={30} onClick={togglePlayPause}/>
                        <Icon icon="mage:next-fill" style={{ color: "#00f56a" }} fontSize={20} />
                        <Icon icon="fa6-solid:repeat" style={{ color: "#00f56a" }} fontSize={20} />
                   
                    </div>
                </div>
                <div className='w-1/4 mr-7 flex justify-end'>
                <button className='m-2'
                onClick={(e)=>{setAddToPlaylistSong(true)}}
                ><Icon icon="material-symbols:playlist-add" width="30" height="30"  style={{color: "#7ff0a1"}} /></button>
                <button><Icon icon="solar:heart-line-duotone" width="30" height="30"  style={{color: "#de0202"}} /></button>
                </div>
            </div>
        } */}
                        {/* Bottom Play Bar */}
                        {currentSong && (
                    <div className='w-full h-2/10 md:h-1/10 p-0 m-0 bg-gray-900 text-white flex items-start md:items-center'>
                        <div className='w-1/4 flex items-center'>
                            <img
                                src={currentSong.thumbnail}
                                className='h-8 w-8 md:h-14 md:w-14 rounded-lg m-2'
                                alt='Song Thumbnail'
                            />
                            <div className='pl-1 md:pl-4'>
                                <div className='hidden md:block  text-xs md:text-sm hover:underline cursor-pointer'>
                                    {currentSong.name}
                                </div>
                                <div className='hidden md:block  text-xs md:text-xs hover:underline cursor-pointer text-gray-500'>
                                    {currentSong.artist.firstName + " " + currentSong.artist.lastName}
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2 h-full flex justify-start md:justify-center flex-col items-center'>

                            {/* Control Icons */}
                            <div className='flex w-3/4 justify-evenly  mb-1'>
                                <Icon className='cursor-not-allowed' icon="icon-park-outline:shuffle-one" width="24" height="24" style={{ color: "#00f56a" }} fontSize={20} />
                                <Icon className='cursor-not-allowed' icon="solar:skip-previous-bold" style={{ color: "#00f56a" }} fontSize={20} />
                                <Icon
                                    className='cursor-pointer'
                                    icon={isPaused ? "ic:baseline-play-circle" : "ic:baseline-pause-circle"}
                                    fontSize={30}
                                    onClick={togglePlayPause}
                                />
                                <Icon className='cursor-not-allowed' icon="mage:next-fill" style={{ color: "#00f56a" }} fontSize={20} />
                                <Icon className='cursor-not-allowed' icon="fa6-solid:repeat" style={{ color: "#00f56a" }} fontSize={20} />
                            </div>

                            {/* Seek Bar */}
                            <input
                            
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={progress}
                                onChange={handleSeekChange}
                                className="hidden md:block w-2/3 h-0.5 mt-2 cursor-pointer bg-gray-500 accent-green-500"
                            />
                            <div className="hidden md:block text-xs text-gray-400 mt-1">
                                {formatTime(progress)} / {formatTime(duration)}
                            </div>
                        </div>

                        <div className='w-1/4 flex justify-end items-center mr-2'>
                            {/* Volume Control */}
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="hidden md:block w-16 m-1 cursor-pointer bg-gray-500 accent-green-500"
                            />
                            {/* Playback Speed */}
                            <select value={playbackRate} onChange={handlePlaybackRateChange} className="hidden md:block m-1 p-1 bg-gray-800 text-white rounded">
                                <option value="0.5">0.5x</option>
                                <option value="1">1x</option>
                                <option value="1.5">1.5x</option>
                                <option value="2">2x</option>
                            </select>
                            <button className='m-2' onClick={() => setAddToPlaylistSong(true)}>
                                <Icon icon="material-symbols:playlist-add" width="30" height="30" style={{ color: "#7ff0a1" }} />
                            </button>
                            <button>
                                <Icon icon="solar:heart-line-duotone" width="30" height="30" style={{ color: "#de0202" }} />
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};


const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

export default Logged_in_container;
// https://res.cloudinary.com/dsdpnz2xz/video/upload/v1724018340/p0rawlyq…
