import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "../Areas/Header";
import Footer from "../Areas/Footer";
import CreateArea from "../Areas/CreateArea";
import NotesArea from "../Areas/NotesArea";
import { selectUser } from "../features/userSlice";
import "./HomeScreen.css";
import { settingNotesList } from "../components/Utils";
var Masonry = require("masonry-layout");

function HomeScreen() {
  //State of note and list of notes
  const [createNote, setCreateNote] = useState({ title: "", content: "" });
  const [notesList, setNotesList] = useState([]);
  const [list, setList] = useState([]);
  const [editNote, setEditNote] = useState({ title: "", content: "" });
  const user = useSelector(selectUser);
  const [msnry, setMsnry] = useState(null);

  console.log("NotesList: ", notesList);

  useEffect(() => {
    settingNotesList(user, setList, setNotesList);
  }, [user]);

  useEffect(() => {
    // When notes are loaded initiate masonry
    if (notesList.length!==0) {
      setMsnry(
        new Masonry(".grid", {
          columnWidth: 0,
          itemSelector: ".Note",
          fitWidth: true,
          gutter: 0,
        })
      );
    }
    return () => {};
  }, [notesList]);

  return (
    <div className="HomeScreen">
      <Header msnry={msnry} setNotesList={setNotesList} list={list} />
      <CreateArea
        createNote={createNote}
        setCreateNote={setCreateNote}
        notesList={notesList}
        setNotesList={setNotesList}
        editNote={editNote}
        setEditNote={setEditNote}
        user={user}
      />
      <NotesArea
        msnry={msnry}
        createNote={createNote}
        setCreateNote={setCreateNote}
        notesList={notesList}
        setNotesList={setNotesList}
        editNote={editNote}
        setEditNote={setEditNote}
        user={user}
      />
      <Footer />
    </div>
  );
}

export default HomeScreen;
