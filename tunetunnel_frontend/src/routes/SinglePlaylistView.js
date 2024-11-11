import React, { useEffect, useState } from 'react'
import Logged_in_container from '../containers/Logged_in_container'
import { useParams } from 'react-router-dom'
import { makeAuthenticatedGetRequest } from '../utils/serverHelper'
import SingleSongCard from '../components/shared/SingleSongCard'

const SinglePlaylistView = () => {
  const { playlistID } = useParams()
  const [playlistDetails, setPlaylistDetails] = useState({})

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGetRequest('/playlist/get/playlist/' + playlistID)
      console.log(response)
      setPlaylistDetails(response)
    
    }
    getData()
  }, [])


  // console.log(playlistID)
  return (
    <Logged_in_container currentRoute={'library'}>
      {
        playlistDetails._id  ? <>
          <div className='text-white p-2 font-bold text-xl'>{playlistDetails.name}</div>
          <div>

            <div className='p-2 m-1'>
              {
                playlistDetails.songs.map((e) => {
                  return (<SingleSongCard info={e} playSound={() => { }} key={JSON.stringify(e)} />)
                })
              }
            </div>

          </div>
        </>
          : (

            <div>
              <div className='text-white font-bold text-xl'>{playlistDetails.name}</div>
              {/* <div>{playlistDetails.songs.length}</div> */}

            </div>
          )
      }
    </Logged_in_container>
  )
}

export default SinglePlaylistView