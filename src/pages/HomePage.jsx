import React from 'react'
import Filter from '../components/Filter'
import NoteCardContainer from '../components/NoteCardContainer'

// notes is passed in from the app.jsx route (djnago note data)
// loading is also passed (spinner true or false)
 const HomePage = ({notes, loading, handleFilterText}) => {
  return (
    <>
   {notes.length < 1 ? <h4 style={{textAlign : "center", marginTop : "10px"}}>There is no notes found with the search phrase</h4> : <Filter handleFilterText={handleFilterText} />}
    <NoteCardContainer notes={notes} loading={loading}/>
    </>
  )
}

export default HomePage