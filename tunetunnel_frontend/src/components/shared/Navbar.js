import React from 'react';
import NavButton from './NavButton';
import { Icon } from "@iconify/react"

const Navbar = ({mainbutton}) => {
  return (
    <div className='w-full flex bg-gray-950 sticky top-0  justify-between items-center rounded-md' style={{height: '10%'}}>
              <div className='flex justify-between'>
        <Icon icon="raphael:arrowleft" width="24" height="24"  style={{color: 'white'}} />
        <Icon icon="raphael:arrowright" width="24" height="24"  style={{color: 'white'}} />
        </div>
      <div className='flex items-center'>
      {/* <NavButton label={'Premium'}  /> */}
      <Icon icon="mingcute:notification-fill" width="30" height="30"  style={{color: 'white'}} className='sm:hidden'/>
      <div className='hidden sm:block'><NavButton label={'Notification'} /></div>
      
      <NavButton label={'Sign Up'} />
      <div className='hidden sm:block p-2 mx-2 border-r-2 border-gray-300'></div>
      <button class="hover:brightness-110 hover:animate-pulse font-bold mr-3 py-1 px-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white">{mainbutton}</button>
      </div>

    </div>
  );
}

export default Navbar;