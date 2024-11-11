import React from 'react'

const NavButton = ({ label, active }) => {
  return (
    <div className='flex h-fit w-full items-center cursor-pointer'>
      <div className='pl-7'>
        <h2 className={`${active ? 'text-white' : 'text-gray-400'} text-0.5xl hover:text-white`}>{label}</h2>
      </div>
    </div>
  )
}

export default NavButton