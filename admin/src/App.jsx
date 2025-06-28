import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer, toast } from 'react-toastify';
// import { LiaRupeeSignSolid } from "react-icons/lia";

export const backendUrl = import.meta.env.VITE_BACKEND_URL
// export const currency = <LiaRupeeSignSolid/>

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  return (
    <div className='bg-zinc-100 min-h-screen'>
      <ToastContainer />
      {token === "" ?
        <Login setToken={setToken} /> :
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%]'>
              <Routes>
                <Route path='/list' element={<List token={token} />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>}


    </div>
  )
}

export default App
