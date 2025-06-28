import React from 'react'
import logo from '../assets/logo1.png'

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center px-4 py-2 bg-slate-200'>
      <img src={logo} className='w-20' />
      <button onClick={()=>setToken('')} className='bg-gray-400 text-red-600 md:text-xl px-3 py-2 rounded-md flex items-center cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
