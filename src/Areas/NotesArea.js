import React, { useEffect, useState } from "react";
import "./NotesArea.css";
import Note from "../components/Note";
import { handleDelete, handleEditSubmit } from "../components/Utils";
import CreateArea from "./CreateArea";
import Modal from "react-modal";
import { initMasonry, selectMasonry } from "../features/masonrySlice";
import { useDispatch, useSelector } from "react-redux";
// var Masonry = require("masonry-layout");

function NotesArea({
  msnry,
  createNote,
  setCreateNote,
  notesList,
  setNotesList,
  editNote,
  setEditNote,
  user,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  // const masonryChange = useSelector(selectMasonry);
  const dispatch = useDispatch();

  useEffect(() => {
    setVisible(true);
  }, []);

  // ! Modal
  Modal.setAppElement("#root");
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.4)",
      animation: "fadein 0.5s",
    },
    content: {
      margin: "10vh auto",
      width: "50%",
      padding: "0px",
      borderRadius: "7px",
      backgroundColor: "rgba(40,40,40,0.9)",
      animation: "fadein 0.5s",
    },
  };
  function openModal(id) {
    Modal.noteData = id;
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    const k = notesList.filter((createNote) => {
      return createNote.id === Modal.noteData;
    });
    if (editNote.title !== k[0].title || editNote.content !== k[0].content) {
      handleEditSubmit(
        user.uid,
        Modal.noteData,
        setNotesList,
        notesList,
        editNote,
        setEditNote
      );
    }
    setIsOpen(false);
    const time = new Date().getTime();
    dispatch(initMasonry(time));
  }

  // ! Masonry

  function reloadMasonry() {
    msnry.layout();
    msnry.reloadItems();
  }

  // Forcing masonry layout when NotesArea mounts
  // *This will only trigger when msnry is changed from null -> Masonry

  useEffect(() => {
    // if (msnry && notesList !== []) {
    //   // msnry.layout();
    //   // msnry.reloadItems();
    //   if (notesList !== []) {
    //     setVisible(true);
    //     console.log("called", notesList);
    //   }
    //   const int = setInterval(() => {
    //     msnry.layout();
    //     msnry.reloadItems();
    //   }, 1000);
    //   setTimeout(() => {
    //     clearInterval(int);
    //   }, 3000);
    //   function out() {
    //     console.log("layout is complete");
    //   }
    //   console.log("msnry: ", msnry);
    //   // Adding event listener for completing layout
    //   msnry.on("layoutComplete", out);
    //   return () => {
    //     // Removing event listener for completing layout
    //     msnry.off("layoutComplete", out);
    //   };
    // }
  }, [msnry, notesList]);

  // // Runs whenever search bar is updated
  // useEffect(() => {
  //   console.log("msnry: ", msnry);
  //   if (msnry) {
  //     const int = setInterval(() => {
  //       msnry.layout();
  //       msnry.reloadItems();
  //     }, 500);
  //     setTimeout(() => {
  //       clearInterval(int);
  //     }, 3000);
  //   }
  // }, [masonryChange, msnry]);

  // console.log("createNote: ", createNote);
  // console.log("editnote: ", editNote);

  return (
    <div
      className={`NotesArea ${
        visible ? "NotesArea-visible" : "NotesArea-invisible"
      }`}
    >
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="Example Modal"
        >
          <CreateArea
            createNote={createNote}
            setCreateNote={setCreateNote}
            notesList={notesList}
            setNotesList={setNotesList}
            editNote={editNote}
            setEditNote={setEditNote}
            user={user}
            editing
            closeModal={closeModal}
          />
        </Modal>
      </div>

      <div className="NotesArea-reload-bar">
        <button className="NotesArea-btn" onClick={reloadMasonry}>
          <i className="fa fa-refresh light"></i>
        </button>
      </div>

      <div className="grid">
        {notesList.map((createNote, index) => {
          return (
            <Note
              key={index}
              id={createNote.id}
              title={createNote.title}
              content={createNote.content}
              onEditing={() => {
                openModal(createNote.id);
              }}
              onDeleting={() =>
                handleDelete(user.uid, createNote.id, setNotesList, notesList)
              }
              open={() => {
                openModal(createNote.id);
                const a = notesList.filter((x) => {
                  return x.id === createNote.id;
                });
                console.log("t: ", a[0].title);
                console.log("c: ", a[0].content);
                setEditNote({ title: a[0].title, content: a[0].content });
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NotesArea;
