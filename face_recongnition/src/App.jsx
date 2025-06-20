import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './component4/attendencemarker'
import Home from './component4/home'
import Nav from './component4/nav'
import Registration from './component4/registration'
import Login from './component4/login'
import { Routes,Route } from 'react-router-dom'
import Requestpage from './adminpanel/requestpage'
import Adminhome from './adminpanel/adminhome'
import 'animate.css';
import AdminNav from './adminpanel/adminNav'
import Loader from './component4/loader/loader'
import Setattendence from './component4/attendence/setattendence'


function App() {


  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/admin' element={<Adminhome/>}/>


    <Route path='/signup' element={<Signup/>}/>
    <Route path='/registration' element={<Registration/>}/>
    <Route path='/attendence' element={<Setattendence/>}/>
    <Route path='/loader' element={<Loader/>}/>
    <Route path='/request' element={<Requestpage/>}/>
    <Route path='/adminnav' element={<AdminNav/>}/>




    </Routes>
    
    </>
  )
}

export default App
