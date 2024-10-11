import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from "react-router-dom"
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendURl = "https://e-commers-back.vercel.app"  // Backend URL from environment variables

const App = () => {

  // Check if there's a token stored in localStorage, otherwise set an empty string
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  // Update localStorage whenever the token state changes
  useEffect(() => {
    console.log("Token updated:", token); // Add this to verify token updates
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer /> {/* To display toast notifications */}
      
      {
        // If token is not available, show the Login page; otherwise, show the main app with routes
        token === ''
          ? <Login setToken={setToken} /> 
          :
          <>
            <Navbar setToken={setToken} /> {/* Changed setItem to setToken */}
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vm,25px)] my-8 text-gray'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Order token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default App
