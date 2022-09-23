import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import "./Header.css";
import { initMasonry } from "../features/masonrySlice";

//Taking in states of note, list of notes and - as props in Header funtion.
function Header({ n, sn, l, sl, list, setList, simple }) {
  // Using state for value of search bar
  const [sval, setSval] = useState("");
  const dispatch = useDispatch();

  // console.log("head msnry", msnry);

  // This function gets triggered when search bar is updated.
  function update(event) {
    setSval(event.target.value);
    Search(event.target.value, sl, l);
  }

  // This functions filters 'list' variable
  function Search(val) {
    var a = list.filter(
      (item) => item.title.search(val) >= 0 || item.content.search(val) >= 0
    );
    sl(a);

    dispatch(initMasonry(a));
  }

  return (
    <header>
      <h1>Keeper</h1>
      {!simple && (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              onChange={update}
              onSubmit={update}
              name="Search-bar"
              value={sval}
              className="Search-bar"
              placeholder="Search"
            />
          </form>
          <button
            className="Log-out-btn"
            onClick={() => {
              dispatch(logout());
              signOut(getAuth());
            }}
          >
            Sign out
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
