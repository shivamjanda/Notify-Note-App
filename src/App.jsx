// App.jsx is the parent commponent
// every other component will be placed into this app component
// before it can be displayed into the browser

import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import MainLayout from './Layout/MainLayout'
import AddNotePage from './pages/AddNotePage'
import NoteDetailPage from './pages/NoteDetailPage'
import EditNotePage from './pages/EditNotePage'
import { useState, useEffect } from "react"
import axios from 'axios'
import { toast } from 'react-toastify';

const App = () => {


// declare state
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState("")
  const [searchText, setSearchText] = useState("")


  const handleFilterText = (val) => {
    setFilterText(val)
  }

  const handleSearchText = (val) => {
    setSearchText(val)
  }

  const filteredNotes = 
    filterText == "BUSINESS" ? notes.filter(note => note.category == "BUSINESS")
    : filterText === "PERSONAL" ? notes.filter(note => note.category == "PERSONAL") 
    : filterText === "IMPORTANT" ? notes.filter(note => note.category == "IMPORTANT")
    : notes

  
  useEffect(() => {
    if(searchText.length < 3) return;
    axios.get(`http://127.0.0.1:8008/notes-search/?search=${searchText}`)
    .then(res => {
      console.log(res.data)
      setNotes(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [searchText])

  // fetch note data from back end
  useEffect(() =>{
    setIsLoading(true) // if data is being fetched
    // axios fetches data very well
    // return a promise
    axios.get("http://127.0.0.1:8008/notes/")
    
    // get the response from axios
    .then(res =>{
      console.log(res.data)
      setNotes(res.data) // got the note data from the backend and passed it over to the notes state.
      setIsLoading(false) // if data has finished being fetched
    })
    // if there is a problem. catch the problem and tell us what it is
    .catch(err => {
      console.log(err.message)
    })
  }, [])  // making sure the effect runs once
          // dependency array


  // function to add new note into our backend
  // data is the information we want to add to our djnago database from our newNote object
const addNote = (data) => {
    axios
      .post("http://127.0.0.1:8008/notes/", data)
      .then((res) => {
        setNotes([...notes, data])
        toast.success("A new note has been added!") // install and use toastify for notifcation popups for add new notes
        console.log(res.data)
      })

      .catch((err) => { // catch and display any error message
        console.log(err.message)
      })
  }

const updateNote = (data, slug) => {
  axios.put(`http://127.0.0.1:8008/notes/${slug}/`, data)
  .then((res) => {
    console.log(res.data)
    toast.success("Note updated sucessfully")
  })
  .catch((err) => {
    console.log(err.message)
  })
}

const deleteNote = (slug) => {
  axios
    .delete(`http://127.0.0.1:8008/notes/${slug}`)
    .catch((err) => console.log(err.message));
};
  // Created a new path for the home page
    // when we first load the website we will see the home page
    const router = createBrowserRouter(createRoutesFromElements(
     // Main layout (nav bar) every page is going to display the nav bar
     // Route Homepage is the homepage that displays all the notes.
     // We have given the note information that was recieved from the backend (django)
     // Route AddNote is the add note page inerface where we add a new note.
    
     <Route path="/" element={<MainLayout searchText={searchText} handleSearchText={handleSearchText} />}> 
              <Route index element={<HomePage  notes={filteredNotes} loading={isLoading} handleFilterText={handleFilterText}/>} />
              <Route path="/add-note" element={<AddNotePage addNote={addNote}/>}/>
              <Route path="/edit-note/:slug" element={<EditNotePage updateNote={updateNote} />}/>
              <Route path="/notes/:slug" element={<NoteDetailPage deleteNote={deleteNote} />}/>
      </Route>
  ))
  return <RouterProvider router={router} />
   
}

export default App