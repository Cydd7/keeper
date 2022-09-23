import React, { useEffect, useState } from "react";
import "./NotesArea.css";
import Note from "../components/Note";
import { handleDelete, handleEdit } from "../components/Utils";
import CreateArea from "./CreateArea";
import Modal from "react-modal";
import { initMasonry, selectMasonry } from "../features/masonrySlice";
import { useDispatch, useSelector } from "react-redux";
var Masonry = require("masonry-layout");

function NotesArea({ n, sn, l, sl, editNote, setEditNote, user }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [layoutState, setLayoutState] = useState(false);
  const masonryChange = useSelector(selectMasonry);
  const dispatch = useDispatch();

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
    const k = l.filter((n) => {
      return n.id === Modal.noteData;
    });
    if (editNote.title !== k[0].title || editNote.content !== k[0].content) {
      handleEdit(user.uid, Modal.noteData, sl, l, editNote, setEditNote);
    }
    setIsOpen(false);
    const time = new Date().getTime();
    dispatch(initMasonry(time));
  }

  // Initializing masonry
  var msnry = new Masonry(".grid", {
    columnWidth: 0,
    itemSelector: ".Note",
    fitWidth: true,
    initLayout: { layoutState },
    gutter: 0,
  });

  function reloadMasonry() {
    msnry.layout();
    msnry.reloadItems();
  }

  // Forcing masonry layout on starting website
  useEffect(() => {
    const int = setInterval(() => {
      setLayoutState(true);
      msnry.layout();
      msnry.reloadItems();
    }, 1000);
    setTimeout(() => {
      clearInterval(int);
    }, 5000);
  }, []);

  // Event listener for completing layout
  msnry.on("layoutComplete", function () {
    // console.log("layout is complete");
    // console.log("After Layout: ", msnry);
  });

  // Runs whenever search bar is updated
  useEffect(() => {
    if (msnry) {
      const int = setInterval(() => {
        msnry.layout();
        msnry.reloadItems();
      }, 500);
      setTimeout(() => {
        clearInterval(int);
      }, 3000);
    }
  }, [masonryChange]);

  // console.log("n: ", n);
  // console.log("editnote: ", editNote);

  return (
    <div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="Example Modal"
        >
          <CreateArea
            n={n}
            sn={sn}
            l={l}
            sl={sl}
            editNote={editNote}
            setEditNote={setEditNote}
            user={user}
            editing
            closeModal={closeModal}
          />
        </Modal>
      </div>

      {/* <input type="button" value="Reload" onClick={reloadMasonry} /> */}

      <div className="grid">
        {l.map((n, index) => {
          return (
            <Note
              key={index}
              id={n.id}
              title={n.title}
              content={n.content}
              onEditing={(l) => {
                openModal(n.id);
              }}
              onDeleting={() => handleDelete(user.uid, n.id, sl, l)}
              open={() => {
                openModal(n.id);
                const a = l.filter((x) => {
                  return x.id == n.id;
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
