import React, { useContext } from 'react'
import songContext from '../../contexts/songContext'

const SingleSongCard = ({info,playSound}) => {
    const {currentSong, setCurrentSong}=useContext(songContext)
    return (
        <>
            <div className='flex p-2 hover:bg-gray-300 hover:bg-opacity-10 rounded-lg' 
            onClick={()=>{
                // playSound(info.track)
                setCurrentSong(info)
                console.log(info)
                }}>
                <div className='w-12 h-12 bg-cover bg-center' style={{
                    backgroundImage: `url("${info.thumbnail}")`
                }}>

                </div>
                <div className='flex w-full'>
                    <div className='justify-center pl-3 text-white flex flex-col w-5/6'>
                        <div className='hover:cursor-pointer hover:underline'>{info.name}</div>
                        <div className='text-sm text-gray-400 hover:cursor-pointer hover:underline'>{info?.artist?.firstName +" "+info?.artist?.lastName}</div>
                    </div>
                    <div className='w-1/6 flex justify-center text-gray-300 items-center'>
                     <div className='text-sm'>3.44</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleSongCard