import React from 'react'

const Card = ({Title,Description,imageUrl}) => {
  return (
    <div className='p-2 my-1 w-28 h-48 overflow-y-hidden sm:h-auto sm:w-1/6 bg-black rounded-md'>
        <img className='rounded-sm h-28 w-full' src={imageUrl}></img>
        <div className='mt-3 font-bold text-white text-sm'>{Title.substring(0,10)}</div>
        <div className='mt-3 mb-1 font-semibold text-gray-500 text-xs'>{Description}</div>
    </div>
  )
}

export default Card