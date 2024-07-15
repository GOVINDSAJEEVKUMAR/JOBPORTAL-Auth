import React from 'react'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import {Route,Routes} from "react-router-dom"
import Phone from './components/PhoneVerify/Phone'
import Verify from './components/GoogleVerify/Verify'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup'  element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/phone" element={<Phone />} />
        <Route path ="/google" element={<Verify/>}/>
      </Routes>
      
    </div>
  )
}

export default App
