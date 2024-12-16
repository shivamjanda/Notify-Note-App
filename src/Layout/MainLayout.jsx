import React from 'react'
import NavBar from '../components/NavBar'
import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = ({searchText, handleSearchText}) => {
  return (
        // Nav bar is on every page
        // Nav bar is the parent element
        // Outlet is the different pages view
    <>
    <NavBar  searchText={searchText} handleSearchText={handleSearchText} />
    <ToastContainer /> 
    <Outlet /> 

    </>
  )
}

export default MainLayout