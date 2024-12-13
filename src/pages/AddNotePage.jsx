import React, { useState } from 'react'
import "./AddNotePage.css"
import { useNavigate } from 'react-router-dom'

// take in the function from the app.jsx called addNote
const AddNotePage = ({addNote}) => {
const [title, setTitle] = useState("")
const [body, setBody] = useState("")
const [category, setCategory] = useState("")

const navigate = useNavigate
// we are going to send this note object to our backend (django)
// Creating a new note using this object (add note)
const newNote = {
  title: title,
  body: body, 
  category: category
}

// handle the submission button
// is the event object
const handleSubmit = (e) => {
  // prevent the page from loading
  e.preventDefault()
  if(!title && !body && !category) {
    return; // if any of the field is empty nothing will be returned. Has to be filled out
  }
  addNote(newNote) // when submitted use the function addNote that was passed from app.jsx to add the newNote object entered from the form.
  navigate("/") // once the add note is submitted redirect to home page
  console.log(newNote)
}

  return (
    <form onSubmit={handleSubmit}>
      <h5>Add New Note</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter note's title"
          // whenever we type into the title field we are gonna update the title field
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
          value={body}
          onChange={(e) => setBody(e.target.value)}

        ></textarea>
      </div>

      <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Note's category
        </label>
      <select className="form-select" aria-label="Default select example" value={category} style={{height: "40px"}} onChange={(e) => setCategory(e.target.value)}
      >
          <option value="">Pick a category</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>

      <button className="btn btn-primary d-flex justify-content-center" style={{width:"100%"}}>Add Note</button>
    </form>
  )
}

export default AddNotePage