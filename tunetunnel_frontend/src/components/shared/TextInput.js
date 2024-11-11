import React from 'react'

const TextInput = ({placeholder,label,value,setValue,labelColor}) => {
  return (
    <div className='TextInput w-full flex flex-col justify-center space-y-1'>
        <label for={label} className={`font-semibold ${labelColor}`}>
            {label}
        </label>
        <input type='text' placeholder={placeholder}
         className='border border-gray-400 border-solid p-2 rounded font-bold text-black'
         id={label}
         value={value}
         onChange={(e)=>{setValue(e.target.value)}}
         required
         ></input>
    </div>
  )
}

export default TextInput