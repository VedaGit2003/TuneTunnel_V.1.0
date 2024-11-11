import React from 'react'
import { Icon } from "@iconify/react"
import { Link } from 'react-router-dom'

const IconText = ({iconname,label,active,targetLink}) => {
  return (
    <Link to={targetLink} className='block'>
    <div className='flex h-fit w-full items-center cursor-pointer'>
      <div className='pl-3'>
      <Icon icon={iconname} width="24" height="24"  style={active?{"color": 'white'}:{"color": 'gray'}} />
      </div>
      <div className='pl-7 hidden sm:block'>
      <h2 className={`${active? 'text-white':'text-gray-400'} text-xl hover:text-white`}>{label}</h2>
      </div>
    </div>
    </Link>
  )
}

export default IconText