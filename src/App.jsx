import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import Otp from './components/auth/Otp'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/otp' element={<Otp/>} />
      <Route path='/dashboard' element={<Dashboard/>} />

    </Routes>
      
    </>
  )
}

export default App
