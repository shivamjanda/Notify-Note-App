import React from 'react'
import Filter from '../components/Filter'
import NoteCardContainer from '../components/NoteCardContainer'

// notes is passed in from the app.jsx route (djnago note data)
// loading is also passed (spinner true or false)
 const HomePage = ({notes, loading}) => {
  return (
    <>
    <Filter />
    <NoteCardContainer notes={notes} loading={loading}/>
    </>
  )
}

export default HomePage