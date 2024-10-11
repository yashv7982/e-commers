import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = ({ setToken }) => {

  const handleLogout = () => {
    console.log("Logging out...");
    setToken(''); // Clear the token and trigger rerender
  }

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img src={assets.logo} className='w-[max(10%,80px)]' alt="Logo" />
      <button
        onClick={handleLogout} // Using a function for better logging and control
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  )
}

export default Navbar
