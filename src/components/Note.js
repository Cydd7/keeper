import React from "react";
import "./Note.css";

function Note({ id, title, content, onEditing, onDeleting, open }) {
  return (
    <div className="Note" id={id}>
      <div className="Note-main" onClick={open}>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>

      <div className="Note-options">
        <button className="Note-edit" onClick={onEditing}>
          <img
            src={require("../assets/images/edit_white.png")}
            alt={"edit"}
            style={{
              height: "19px",
              width: "19px",
            }}
          />
        </button>
        <button className="Note-delete" onClick={onDeleting}>
          <img
            src={require("../assets/images/del_white.png")}
            alt={"delete"}
            style={{
              height: "17px",
              width: "17px",
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default Note;
