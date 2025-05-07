import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
      
    </>
  )
}

export default App
