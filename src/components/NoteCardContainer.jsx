import React from 'react'
import NoteCard from './NoteCard'
import Loader from './Loader'
const NoteCardContainer = ({notes, loading}) => {
  return (
    <div className="container">
    <div className="note-has-grid row">
    {/* passing down true or false to loading.jsx information*/}
    
    { loading && <Loader loading={loading}/>}
   {/*array of note objects which was passed by the data which was from django*/}
    { notes.map(note => <NoteCard key={note.id} note={note} />)}
        </div>
    </div>
  )
}

export default NoteCardContainer
