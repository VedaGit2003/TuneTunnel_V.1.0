import React, { useEffect, useState } from 'react'
import { makeAuthenticatedGetRequest } from '../utils/serverHelper'

const AddToPlaylist = ({ closeModal,addSongToPlaylist}) => {
  const [myPlaylist, setMyPlaylist] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGetRequest("/playlist/get/myplaylist")
        setMyPlaylist(response)
        console.log(response)
      }
      catch (error) {
        console.error(error)
        setMyPlaylist([])
      }
    }
    getData()
  }, [])
  return (
    <div
      className="absolute w-screen h-screen z-40 backdrop-blur-sm bg-green/30 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="relative  drop-shadow-xl w-60 md:w-1/3 h-64 overflow-hidden rounded-xl bg-[#2e2c2e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 absolute flex flex-col items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#252425]">
          <div className='text-green-400 font-bold text-xl mb-2'>Select Playlist</div>
          <div className='flex flex-col overflow-y-auto w-full'>
            {
              myPlaylist.map((item)=>{
                return <PlaylistComponent info={item} addSongToPlaylist={addSongToPlaylist}/>
              })
            }
          </div>
        </div>
        <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
      </div>
    </div>
  )
}

const PlaylistComponent = ({ info,addSongToPlaylist}) => {
  return (
    <div className='bg-black cursor-pointer flex p-1 items-center space-x-2 hover:bg-slate-500' onClick={()=>{addSongToPlaylist(info._id)}}>
      <div>
       <img src={info.thumbnail} className='w-10 h-10 rounded'></img>
      </div>
      <div>
        {info.name}
      </div>
    </div>
  )
}

export default AddToPlaylist