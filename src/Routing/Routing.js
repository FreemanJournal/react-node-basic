import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddUser from '../components/AddUser/AddUser'
import UpdateUser from '../components/UpdateUser/UpdateUser'
import Home from '../pages/Home'

export default function Routing() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='user/add' element={<AddUser/>}/>
        <Route path='user/update/:id' element={<UpdateUser/>}/>
    </Routes>
  )
}
