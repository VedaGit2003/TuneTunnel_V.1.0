import React from 'react'

const PassWord = ({placeholder,label,types,value,setValue}) => {
  return (
    <div className='TextInput w-full flex flex-col justify-center space-y-2'>
        <label for={label} className='font-semibold'>
            {label}
        </label>
        <input type={types} placeholder={placeholder}
         className='border border-gray-400 border-solid p-2 rounded font-bold'
         id={label} value={value} onChange={(e)=>setValue(e.target.value)} required
         ></input>
    </div>
  )
}

export default PassWord