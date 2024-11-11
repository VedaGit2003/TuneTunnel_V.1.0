import React, { useEffect, useState } from 'react';
import { Howler, Howl } from 'howler';
import { Icon } from "@iconify/react";
import IconText from '../components/shared/IconText';
import Navbar from '../components/shared/Navbar';
import Playlistview from '../components/Pages/Playlistview';
import NavButton from '../components/shared/NavButton';
import Logged_in_container from '../containers/Logged_in_container';
import { makeAuthenticatedGetRequest } from '../utils/serverHelper';

// const LoggedInhome = () => {
//     const focusCardsData = [
//         {
//             title: "Peaceful Piano",
//             description: "Relax and indulge with beautiful piano pieces",
//             imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
//         },
//         {
//             title: "Deep Focus",
//             description: "Keep calm and focus with this music",
//             imgUrl: "data:image/jpeg;base64,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",
//         },
//         {
//             title: "Instrumental Study",
//             description: "Focus with soft study music in the background.",
//             imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
//         },
//         {
//             title: "Focus Flow",
//             description: "Up tempo instrumental hip hop beats",
//             imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//         },
//         {
//             title: "Beats to think to",
//             description: "Focus with deep techno and tech house",
//             imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//         },
//     ];
//     const [songPlayed, setSongPlayed] = useState(null)
//     const [isPaused,setPaused]=useState(true)


//     const playSound = (songSrc) => {
//         if (songPlayed) {
//             songPlayed.stop()
//         }
//         let sound = new Howl({
//             src: [songSrc],
//             html5: true
//         });
//         setSongPlayed(sound)
//         sound.play();
//     }
//     const pausedSound=()=>{
//         songPlayed.pause()
//     }
//     const togglePlayPause = ()=>{
//       if(isPaused){
//         playSound('https://res.cloudinary.com/dsdpnz2xz/video/upload/v1724018340/p0rawlyqamciekj5ey61.mp3')
//       setPaused(false)
//       }else{
//         pausedSound()
//         setPaused(true)
//       }
//     }
//     return (
//         <div className='w-full h-full absolute'>
//             <div className='h-9/10 w-full flex'>
//                 <div className='resize-x overflow-auto h-full min-w-18 sm:min-w-70 bg-black flex flex-col p-2'>
//                     <div className='h-fit w-full flex flex-row justify-center items-center mb-3'>
//                         <Icon icon="simple-icons:audioboom" width="54" height="54" style={{ color: '#1ebe30' }} />
//                         <h2 className='font-bold hidden sm:block text-white pl-3 text-2xl'>TuneTunnel</h2>
//                     </div>
//                     <div className='pl-2 sm:pl-6 mt-16 mb-2' >
//                         <IconText iconname={'fluent:home-24-filled'} label={'Home'} active />
//                     </div>
//                     <div className='pl-2 sm:pl-6  mb-2 '>
//                         <IconText iconname={'mingcute:search-3-fill'} label={'Search'} />
//                     </div>
//                     <div className='pl-2 sm:pl-6 mb-2'>
//                         <IconText iconname={'solar:music-library-2-bold'} label={'Library'} />
//                     </div>
//                     <div className='pl-2 sm:pl-6 mb-2'>
//                         <IconText iconname={'fluent-emoji-flat:red-heart'} label={'Favourite'} />
//                     </div>
//                     <div className='pl-2 sm:pl-6 mb-2'>
//                         <IconText iconname={'flat-color-icons:music'} label={'My songs'} />
//                     </div>

//                     {/* Full element for larger screens */}
//                     <div className="relative group hidden sm:block">
//                         <div className="relative w-58 h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10">
//                             <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"></div>
//                             <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black">
//                                 <button
//                                     name="text"
//                                     className="input font-semibold text-md h-full opacity-90 w-full px-16 py-3 rounded-xl bg-black "
//                                 >
//                                     Play Lists
//                                 </button>
//                             </div>
//                             <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-green-500 to-yellow-500 blur-[30px]"></div>
//                         </div>
//                     </div>

//                     {/* Icon for mobile screens */}
//                     <div className="relative group sm:hidden">
//                         <div className="relative w-14 h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10 flex items-center justify-center">
//                             <Icon icon="mdi:playlist-music" width="24" height="24" style={{ color: 'white' }} />
//                         </div>
//                     </div>

//                 </div>
//                 <div className='flex-1 w-full justify-between overflow-y-auto' style={{ backgroundColor: '#141414', color: 'white' }}>


//                     {/* ======nav===== */}
//                     {/* <Navbar mainbutton={'Logout'}/> */}
//                     <div className='w-full flex bg-gray-950 sticky top-0  justify-between items-center rounded-md' style={{ height: '10%' }}>
//                         <div className='flex justify-between'>
//                             <Icon icon="raphael:arrowleft" width="24" height="24" style={{ color: 'white' }} />
//                             <Icon icon="raphael:arrowright" width="24" height="24" style={{ color: 'white' }} />
//                         </div>
//                         <div className='flex items-center'>
//                             {/* <NavButton label={'Premium'}  /> */}
//                             <Icon icon="mingcute:notification-fill" width="50" height="50" style={{ color: 'white' }} className='sm:hidden' />
//                             <div className='hidden sm:block'><NavButton label={'Notification'} /></div>

//                             <NavButton label={'Upload'} />
//                             <div className='hidden sm:block p-2 mx-2 border-r-2 border-gray-300'></div>
//                             <button class="hover:brightness-110 hover:animate-pulse font-bold mr-3 py-1 px-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white">Logout</button>
//                         </div>

//                     </div>

//                     {/* ======navend===== */}

//                     <div className='w-full h-fit overflow-y-auto'>
//                         <Playlistview Title={'Focus'} cardsData={focusCardsData} />
//                         <Playlistview Title={'Favourite'} cardsData={focusCardsData} />
//                         <Playlistview Title={'Famous'} cardsData={focusCardsData} />
//                     </div>

//                 </div>
//             </div>
//             <div className='w-full h-1/10 p-0 m-0 bg-gray-900 text-white flex items-center'>
//                 <div className='w-1/4 flex items-center'>
//                     <img
//                         src='https://images.unsplash.com/photo-1725988208207-a15e5f5eb5fb?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8'
//                         className='h-4 w-4 md:h-14 md:w-14 rounded-lg m-2'
//                     ></img>
//                     <div className='pl-1 md:pl-4'>
//                         <div className='text-xs md:text-sm hover:underline cursor-pointer'>
//                             Curtains
//                         </div>
//                         <div className='text-xs md:text-xs hover:underline cursor-pointer text-gray-500'>
//                             Ed shaden
//                         </div>
//                     </div>
//                 </div>
//                 <div className='w-1/2 h-full flex justify-center flex-col items-center'>

//                     <div className='flex w-1/2 md:1/2 justify-evenly'>
//                         <Icon icon="icon-park-outline:shuffle-one" width="24" height="24" style={{ color: "#00f56a" }} fontSize={20} />
//                         <Icon icon="solar:skip-previous-bold" style={{ color: "#00f56a" }} fontSize={20} />
//                         <Icon icon={isPaused?"ic:baseline-play-circle":"ic:baseline-pause-circle"} fontSize={30} onClick={togglePlayPause}/>
//                         <Icon icon="mage:next-fill" style={{ color: "#00f56a" }} fontSize={20} />
//                         <Icon icon="fa6-solid:repeat" style={{ color: "#00f56a" }} fontSize={20} />
//                     </div>
//                 </div>
//                 <div className='w-1/4 flex justify-end'>hellow</div>
//             </div>
//         </div>
//     );
// };

const LoggedInhome=()=>{
    const [songData,setSongData]=useState([])
    //     const focusCardsData = [
    //     {
    //         title: "Peaceful Piano",
    //         description: "Relax and indulge with beautiful piano pieces",
    //         imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    //     },
    //     {
    //         title: "Deep Focus",
    //         description: "Keep calm and focus with this music",
    //         imgUrl: "data:image/jpeg;base64,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",
    //     },
    //     {
    //         title: "Instrumental Study",
    //         description: "Focus with soft study music in the background.",
    //         imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    //     },
    //     {
    //         title: "Focus Flow",
    //         description: "Up tempo instrumental hip hop beats",
    //         imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    //     },
    //     {
    //         title: "Beats to think to",
    //         description: "Focus with deep techno and tech house",
    //         imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    //     },
    // ];
    useEffect(()=>{
        const getData=async()=>{
          const response=await makeAuthenticatedGetRequest('/song/get/allsongs')
          setSongData(response.data)
        }
        getData()
        },[])
        // Function to return a shuffled copy of an array
        const shuffleArray = (array) => {
            return array
                .map((item) => ({ ...item, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ sort, ...item }) => item);
        };
    return (
        <Logged_in_container currentRoute={"home"}>
            <Playlistview Title={'Focus'} cardsData={shuffleArray(songData)} />
                        <Playlistview Title={'Favourite'} cardsData={shuffleArray(songData)} />
                       <Playlistview Title={'Famous'} cardsData={shuffleArray(songData)} />
        </Logged_in_container>
    )
}

export default LoggedInhome;
// https://res.cloudinary.com/dsdpnz2xz/video/upload/v1724018340/p0rawlyq…
