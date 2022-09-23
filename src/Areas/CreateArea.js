import React, { useEffect, useRef } from "react";
import "./CreateArea.css";
import { handleEdit, handleSubmit } from "../components/Utils";

function CreateArea({
  n,
  sn,
  l,
  sl,
  editNote,
  setEditNote,
  user,
  editing,
  closeModal,
}) {
  // console.log("l: ", l);
  // console.log("n: ", n);
  const titleRef = useRef("");
  const contentRef = useRef("");

  // Handling update of note form at every user input
  function handleUpdate(event) {
    const name = event.target.ariaLabel;
    const value = event.target.innerText;
    if (editing) {
      setEditNote((pv) => ({
        ...pv,
        [name]: value,
      }));
    } else {
      sn((pv) => ({
        ...pv,
        [name]: value,
      }));
    }
  }

  // To keep the sync between n state and note form's content
  useEffect(() => {
    if (editing) {
      if (editNote.title === "" && editNote.content === "") {
        titleRef.current.innerHTML = "";
        contentRef.current.innerHTML = "";
        console.log("Empty");
      }
    } else if (n.title === "" && n.content === "") {
      titleRef.current.innerHTML = "";
      contentRef.current.innerHTML = "";
    }
  }, [n, editNote]);

  useEffect(() => {
    if (editing) {
      titleRef.current.innerHTML = editNote.title;
      contentRef.current.innerHTML = editNote.content;
    }
  }, []);

  return (
    <div className={`Note-form ${editing && "Note-form-editing"}`}>
      <div className="Note-form-title">
        {editing
          ? !editNote.title && <div className="Note-form-title-back">Title</div>
          : !n.title && <div className="Note-form-title-back">Title</div>}
        <div
          ref={titleRef}
          className="Note-form-title-create"
          aria-label="title"
          contentEditable={true}
          onInput={(e) => {
            handleUpdate(e);
          }}
        />
      </div>
      <div className="Note-form-content">
        {editing
          ? !editNote.content && (
              <div className="Note-form-content-back">Take a note...</div>
            )
          : !n.content && (
              <div className="Note-form-content-back">Take a note...</div>
            )}

        <div
          ref={contentRef}
          className="Note-form-content-create"
          aria-label="content"
          contentEditable={true}
          spellCheck="true"
          dir="ltr"
          onInput={(e) => {
            handleUpdate(e);
          }}
        />
      </div>
      <button
        className="Note-form-btn"
        onClick={() => {
          if (editing) {
            closeModal();
          } else {
            handleSubmit(user.uid, n, l, sn, sl);
          }
        }}
        type="button"
      >
        Add
      </button>
    </div>
  );
}
export default CreateArea;
