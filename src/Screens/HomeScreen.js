import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import db from "../firebase";
import Header from "../Areas/Header";
import Footer from "../Areas/Footer";
import CreateArea from "../Areas/CreateArea";
import NotesArea from "../Areas/NotesArea";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./HomeScreen.css";

function HomeScreen() {
  //State of note and list of notes
  const [n, sn] = useState({ title: "", content: "" });
  const [l, sl] = useState([]);
  const [list, setList] = useState([]);
  const [editNote, setEditNote] = useState({ title: "", content: "" });
  const user = useSelector(selectUser);

  // const [isNoteOpen, setIsNoteOpen] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, `users/${user.uid}/notes`),
      orderBy("createdTimestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setList(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      return sl(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  return (
    <div className="HomeScreen">
      <Header n={n} sn={sn} l={l} sl={sl} list={list} setList={setList} />
      <CreateArea
        n={n}
        sn={sn}
        l={l}
        sl={sl}
        editNote={editNote}
        setEditNote={setEditNote}
        user={user}
      />
      <NotesArea
        n={n}
        sn={sn}
        l={l}
        sl={sl}
        editNote={editNote}
        setEditNote={setEditNote}
        user={user}
      />
      <Footer />
    </div>
  );
}

export default HomeScreen;
