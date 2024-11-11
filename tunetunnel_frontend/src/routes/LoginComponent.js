import React, { useState } from 'react'
import { Icon } from "@iconify/react"
import TextInput from '../components/shared/TextInput'
import PassWord from '../components/shared/PassWord'
import { Link, useNavigate } from 'react-router-dom'
import { makeUnauthenticatedPostRequest } from '../utils/serverHelper'
import {useCookies} from 'react-cookie'



const LoginComponent = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [type, setType] = useState('password')
  const [cookies,setCookie]=useCookies(['token'])
  const navigate=useNavigate()
  const handleInput = () => {
    // setType((prev)=>(prev === 'text'?'password':'text'))
    if (type === 'password') {
      setType('text')
    } else {
      setType('password')
    }
  }
 //login
 const login=async()=>{
  if (!email || !password){
    alert("Email and password required")
  return;
  }
  try{
  const data={email,password}
  const response =await makeUnauthenticatedPostRequest('/auth/login',data)
  if (response && !response.error){
    const token=response.token
    const date=new Date()
    date.setDate(date.getDate()+30)
    setCookie('token',token,{path:'/',expires:date})
    alert('login successfull')
   navigate('/home')
  }
  else{
    alert(response?.error || "login failed")
    

  }
} catch (error) {
  alert('Failed to login. Please try again later.');
  console.error('Sign-in error:', error);
}
}
 

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='logo w-full flex justify-center p-2 border-b border-solid border-gray-300'>
        <Icon icon="simple-icons:audioboom" width="54" height="54" style={{ color: '#1ebe30' }} />
      </div>
      <h1 className='font-black'>To continue your journey please login</h1>
      <div className='w-1/3 flex items-center justify-center py-5 flex-col'>
        <TextInput placeholder={"Enter your email or Username"} label={"Email or Username"} value={email} setValue={setEmail}/>
      </div>
      <div className='w-1/3 flex items-center justify-center py-5 flex-row'>
        <PassWord placeholder={"Enter your password"} label={"Password"} types={type} value={password} setValue={setPassword}/>
        <button onClick={handleInput} className='mt-6 absolute right-0 sm:right-0 md:right-4 lg:right-8 w-1/3'>
          {type === 'password' ? <Icon icon="mdi:show-outline" width="1.2rem" height="1.2rem" style={{ color: '#1ebe30' }} />
            : <Icon icon="mdi:hide" width="1.2rem" height="1.2rem" style={{ color: '#1ebe30' }} />}
        </button>
      </div>
      <div className='w-1/3 flex items-center justify-end flex-col'>
        <a className='text-gray-400'>Forgot PassWord?</a>
        <button className="group w-full group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
        onClick={(e)=>{
          e.preventDefault();
          login()
        
        }}
        >
          Login
        </button>
      </div>
      <div className='logo w-1/3 flex justify-center p-2 border-b border-solid border-gray-300'></div>

      <div className='w-1/3 flex items-center justify-center flex-col'>
        <h1 className='font-semibold'>Don't have an account?</h1>
        <Link className='w-full' to='/signup'>
        <button class="w-full mt-2 relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
          Sign Up</button></Link>
      </div>

    </div>

  )
}

export default LoginComponent