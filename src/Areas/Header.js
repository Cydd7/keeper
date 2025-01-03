import React, { useState, useEffect, useRef } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import "./Header.css";
import { initMasonry, closeMasonry } from "../features/masonrySlice";

//Taking in states of note, list of notes and - as props in Header funtion.
function Header({ msnry, setNotesList, list, simple }) {
  // Using state for value of search bar
  const [sval, setSval] = useState("");
  const [debouncedSval, setDebouncedSval] = useState("");

  const searchInput = useRef(null);

  const dispatch = useDispatch();

  // This function gets triggered when search bar is updated with a character.
  function update(event) {
    setSval(event.target.value);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSval(sval);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [sval]);

  useEffect(() => {
    function search(val) {
      if (list) {
        let lowerCaseVal = val.toLowerCase()
        var a = list.filter(
          (item) => item.title?.toLowerCase().search(lowerCaseVal) >= 0 || item.content?.toLowerCase().search(lowerCaseVal) >= 0
        );
        setNotesList(a);
        // dispatch(closeMasonry());
        dispatch(initMasonry(a));
      }
    }
    console.log("debounced search value: ", debouncedSval);
    search(debouncedSval, list);
  }, [debouncedSval, list, dispatch, setNotesList]);

  return (
    <div className="Header">
      <h1>Keeper</h1>
      {!simple && (
        <>
          <form
            className="Header-search-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchInput}
              onChange={update}
              onSubmit={update}
              name="Search-bar"
              value={sval}
              className="Header-search-input"
              placeholder="Search"
            />
          </form>

          <div className="Header-logout">
            <button
              className="Header-logout-btn"
              onClick={() => {
                dispatch(logout());
                signOut(getAuth());
              }}
            >
              {window.innerWidth > 450 ? (
                "Sign out"
              ) : (
                <i style={{ color: "#333" }} class="fa fa-power-off solid"></i>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
