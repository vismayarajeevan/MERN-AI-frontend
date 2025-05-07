import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import Otp from './components/auth/Otp'

function App() {

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/otp' element={<Otp/>} />

    </Routes>
      
    </>
  )
}

export default App
