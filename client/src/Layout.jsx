/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import { Outlet } from 'react-router-dom'


export const Layout = () => {
  return (
    <>
    <Navbar/>
    <div className='flex'>
       <Sidebar/>
       <Outlet/>
    </div>
    </>
  )
}
