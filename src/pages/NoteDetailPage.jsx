import { useState, useEffect } from "react";
import "./NoteDetailPage.css"
import React from 'react'
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom"
import { FormatDate } from "../components/FormatDate";
import axios from "axios";


const NoteDetailPage = () => {

  const [note, setNote] = useState({})

  const {slug} = useParams()

  // fetch from the api (django)
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8008/notes/${slug}`)
      .then((res) => {
        setNote(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [slug]);
  return (
    <div className="note-container">
    <h3 className="title">{note.title}</h3>
    <span className="d-flex justify-content-center">
      <p className="note-date font-12 text-muted me-5">
        {" "}
        created: {FormatDate(note.created)}
      </p>
      <p className="note-date font-12 text-muted me-5">
        last updated: {FormatDate(note.updated)}
      </p>
    </span>
    <span className="button-group">
      <Link to={`/edit-note/${slug}`}>
        <button className="btn btn-primary">
          <FiEdit />
          <span>Edit</span>
        </button>
      </Link>

    </span>
    <p className="description">{note.body}</p>
  </div>
  )
}

export default NoteDetailPage