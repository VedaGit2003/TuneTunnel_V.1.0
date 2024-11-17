import React, { useContext } from 'react'
import Card from '../shared/Card'
import songContext from '../../contexts/songContext'

const Playlistview = ({Title,cardsData}) => {
    // const [currentSong,setCurrentsong]=useContext(songContext)
  return (
    <div className='flex w-full p-3 flex-col mt-1'>
        <div className='font-semibold text-xl text-white mb-3'>{Title}</div>
        <div className='flex flex-wrap gap-4 sm:justify-between sm:space-x-2 sm:gap-0' >
        {
                    // cardsData will be an array
                    cardsData.map((item) => {
                        return (
                            <Card
                                // Title={item.title}
                                Title={item.name}
                                Description="this is a playlist"
                                track={item.track}
                                Song={item}
                                // setCurrentsong={setCurrentsong}
                                // imageUrl={item.imgUrl}
                                imageUrl={item.thumbnail}
                            />
                        );
                    })
                }
        </div>
    </div>
  )
}

export default Playlistview