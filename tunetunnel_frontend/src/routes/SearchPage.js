import React, { useState } from 'react'
import Logged_in_container from '../containers/Logged_in_container'
import { makeAuthenticatedGetRequest } from '../utils/serverHelper'
import SingleSongCard from '../components/shared/SingleSongCard'

const SearchPage = () => {
  const [searchText,setSearchText]=useState("")
  const [searchData,setSearchData]=useState([])

  const search=async()=>{
    const response =await makeAuthenticatedGetRequest('/song/get/songname/'+searchText)
    // console.log(response.data)
    setSearchData(response?.data)
    // setSearchText("")
  }
  return (
    <Logged_in_container currentRoute={"search"}>
<div className='w-full p-3 flex justify-center content-center'>  
<div class="relative rounded-full overflow-hidden bg-gray-300 shadow-xl w-72 h-17 md:w-2/3">
  <input
    class="input text-black bg-transparent outline-none border-none pl-6 pr-10 py-5 w-full font-sans text-lg font-semibold"
    placeholder="Search songs....🎶"
    name="text"
    type="text"
    value={searchText}
    onChange={(e)=>{
      setSearchText(e.target.value)
    }}
    onKeyDown={(e)=>{
       if (e.key==='Enter'){
        search()
       }
    }}
  />
  <div class="absolute right-2 top-[0.4em]">
    <button
      class="w-14 h-14 rounded-full bg-violet-500 group shadow-xl flex items-center justify-center relative overflow-hidden"
    onClick={(e)=>{
      search();
    }}
    >
      <svg
        class="relative z-10"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        height="50"
        width="50"
      >
        <path
          fill-opacity="0.01"
          fill="white"
          d="M63.6689 29.0491L34.6198 63.6685L0.00043872 34.6194L29.0496 1.67708e-05L63.6689 29.0491Z"
        ></path>
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3.76603"
          stroke="white"
          d="M42.8496 18.7067L21.0628 44.6712"
        ></path>
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3.76603"
          stroke="white"
          d="M26.9329 20.0992L42.85 18.7067L44.2426 34.6238"
        ></path>
      </svg>
      <div
        class="w-full h-full rotate-45 absolute left-[32%] top-[32%] bg-black group-hover:-left-[100%] group-hover:-top-[100%] duration-1000"
      ></div>
      <div
        class="w-full h-full -rotate-45 absolute -left-[32%] -top-[32%] group-hover:left-[100%] group-hover:top-[100%] bg-black duration-1000"
      ></div>
    </button>
  </div>
</div>

</div>
{
  searchData.length>0?
  (
    <div className='p-2 m-1'>
      <div className='text-gray-300'>Search results for 
        "<span className='font-bold text-white'>{searchText}</span>"
      </div>
  {
    searchData.map((e)=>{
     return (<SingleSongCard info={e} playSound={()=>{}} key={JSON.stringify(e)}/>)
    })
  }
</div>
  ):
  (
    <div className='text-gray-200 m-1 p-2'>😥 Sorry nothing to show,please search...</div>
  )
}


    </Logged_in_container>
  )
}

export default SearchPage