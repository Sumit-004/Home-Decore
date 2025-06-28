import React from 'react'
import { NavLink } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";
import { CgBox } from "react-icons/cg";
import { FiBox } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r border-gray-800 pr-1' >
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink to='/add' className='flex items-center gap-3 text-zinc-800 text-xl border border-gray-300 borde-r-0 px-3 py-2 rounded-l'>
            <FiPlusCircle className='text-2xl font-bold'/>
            <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='flex items-center gap-3 border text-zinc-800 text-xl border-gray-300 borde-r-0 px-3 py-2 rounded-l'>
            <CgBox className='text-2xl font-bold'/>
            <p className='hidden md:block'>Items List</p>
        </NavLink>
        <NavLink to='/orders' className='flex items-center gap-3 text-zinc-800 text-xl border border-gray-300 borde-r-0 px-3 py-2 rounded-l'>
            <FiBox className='text-2xl font-bold'/>
            <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
