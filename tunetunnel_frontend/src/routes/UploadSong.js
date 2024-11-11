import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import IconText from '../components/shared/IconText';
import Playlistview from '../components/Pages/Playlistview';
import NavButton from '../components/shared/NavButton';
import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { makeAuthenticatedPostRequest } from '../utils/serverHelper';
import { useNavigate } from 'react-router-dom'
import Logged_in_container from '../containers/Logged_in_container';

const UploadSong = () => {
    const [name, setName] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [playlisturl, setPlaylisturl] = useState("")
    const [uploadSongFileName, setUploadSongFileName] = useState("")
    const navigate = useNavigate()
    // console.log(window)
    // console.log(window.cloudinary)
    const submitSong = async () => {
        const data = { name, thumbnail, track: playlisturl }
        const response = await makeAuthenticatedPostRequest('/song/create', data);
        console.log(response)
        if (response.error) {
            alert('could not created song');
            return
        }
        alert('success')
        navigate('/home')
    }

    return (
        // <div className='flex w-full h-full absolute'>
        //     <div className='resize-x overflow-auto h-full min-w-18 sm:min-w-70 bg-black flex flex-col p-2'>
        //         <div className='h-fit w-full flex flex-row justify-center items-center mb-3'>
        //             <Icon icon="simple-icons:audioboom" width="54" height="54" style={{ color: '#1ebe30' }} />
        //             <h2 className='font-bold hidden sm:block text-white pl-3 text-2xl'>TuneTunnel</h2>
        //         </div>
        //         <div className='pl-2 sm:pl-6 mt-16 mb-2' >
        //             <IconText iconname={'fluent:home-24-filled'} label={'Home'} targetLink={'home'} active />
        //         </div>
        //         <div className='pl-2 sm:pl-6  mb-2 '>
        //             <IconText iconname={'mingcute:search-3-fill'} label={'Search'} targetLink={'search'}/>
        //         </div>
        //         <div className='pl-2 sm:pl-6 mb-2'>
        //             <IconText iconname={'solar:music-library-2-bold'} label={'Library'} targetLink={'library'}/>
        //         </div>
        //         <div className='pl-2 sm:pl-6 mb-2'>
        //             <IconText iconname={'fluent-emoji-flat:red-heart'} label={'Favourite'} />
        //         </div>
        //         <div className='pl-2 sm:pl-6 mb-2'>
        //             <IconText iconname={'flat-color-icons:music'} label={'My songs'} targetLink={'mymusic'}/>
        //         </div>

        //         {/* Full element for larger screens */}
        //         <div className="relative group hidden sm:block">
        //             <div className="relative w-58 h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10">
        //                 <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"></div>
        //                 <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black">
        //                     <button
        //                         name="text"
        //                         className="input font-semibold text-md h-full opacity-90 w-full px-16 py-3 rounded-xl bg-black "
                            
        //                     >
        //                         Play Lists
        //                     </button>
        //                 </div>
        //                 <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-green-500 to-yellow-500 blur-[30px]"></div>
        //             </div>
        //         </div>

        //         {/* Icon for mobile screens */}
        //         <div className="relative group sm:hidden">
        //             <div className="relative w-14 h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10 flex items-center justify-center">
        //                 <Icon icon="mdi:playlist-music" width="24" height="24" style={{ color: 'white' }} />
        //             </div>
        //         </div>

        //     </div>
        //     <div className='flex-1 w-full justify-between overflow-y-auto' style={{ backgroundColor: '#141414', color: 'white' }}>


        //         {/* ======nav===== */}
        //         {/* <Navbar mainbutton={'Logout'}/> */}
        //         <div className='w-full flex bg-gray-950 sticky top-0  justify-between items-center rounded-md' style={{ height: '10%' }}>
        //             <div className='flex justify-between'>
        //                 <Icon icon="raphael:arrowleft" width="24" height="24" style={{ color: 'white' }} />
        //                 <Icon icon="raphael:arrowright" width="24" height="24" style={{ color: 'white' }} />
        //             </div>
        //             <div className='flex items-center'>
        //                 {/* <NavButton label={'Premium'}  /> */}
        //                 <Icon icon="mingcute:notification-fill" width="50" height="50" style={{ color: 'white' }} className='sm:hidden' />
        //                 <div className='hidden sm:block'><NavButton label={'Notification'} /></div>

        //                 <NavButton label={'Upload'} />
        //                 <div className='hidden sm:block p-2 mx-2 border-r-2 border-gray-300'></div>
        //                 <button class="hover:brightness-110 hover:animate-pulse font-bold mr-3 py-1 px-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white">Logout</button>
        //             </div>

        //         </div>

                //{/* ======navend===== */}
             
<Logged_in_container currentRoute={'uploadsong'}>
                <div className='w-full h-fit'>
                    <div className='w-full p-3 text-center'>
                        <h1 className='bg-gradient-to-r from-blue-200 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold text-2xl'>Upload Song</h1>
                    </div>
                    <div className='p-7 space-y-4'>
                        <TextInput placeholder={'Song name'} label={'Name of the song'} labelColor={'white'} value={name} setValue={setName} />
                        <TextInput placeholder={'Enter Thumbnail name'} label={'Thumbnail'} labelColor={'white'} value={thumbnail} setValue={setThumbnail} />
                    </div>
                    <div className='p-7'>
                        {
                            uploadSongFileName ?
                                (<div className='bg-green-400 rounded-lg text-black p-2'>{uploadSongFileName.substring(0, 35)}...</div>)
                                :
                                <CloudinaryUpload setUrl={setPlaylisturl} setName={setUploadSongFileName} />
                        }

                    </div>

                    {uploadSongFileName ?
                        <div className='p-7 flex justify-center'>
                            <button class="w-[150px] bg-slate-300 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-black"
                                onClick={(e) => {
                                    e.preventDefault()
                                    submitSong()
                                }}
                            >
                                Upload
                            </button>
                        </div> : <></>

                    }



                </div>
</Logged_in_container>

        //    {/* </div>
        //</div> */}
    )
}

export default UploadSong