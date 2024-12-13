import React from 'react'
import NavBar from '../components/NavBar'
import {Outlet} from 'react-router-dom'

const MainLayout = () => {
  return (
        // Nav bar is on every page
        // Nav bar is the parent element
        // Outlet is the different pages view
    <>
    <NavBar /> 
    <Outlet /> 
    
    </>
  )
}

export default MainLayout