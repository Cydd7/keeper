import {
  query,
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import db from "../firebase";

// TODO: Fetch user id as soon as login and send it to store for broadcasting to whole app.
export async function handleSubmit(uid, n, l, sn, sl) {
  var payload = n;
  payload = { ...payload, createdTimestamp: Timestamp.now().seconds };

  const q = collection(db, `users/${uid}/notes`);
  (async (q) => {
    const ss = await addDoc(q, payload);
    console.log("Note added: ", ss.id);
  })(q).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + errorMessage);
  });

  sl([...l, payload]);
  sn({ title: "", content: "" });
}

export async function handleDelete(uid, id, sl, l) {
  const docref = doc(db, `users/${uid}/notes`, id);
  await deleteDoc(docref);

  sl((prevItems) => {
    return prevItems.filter((n) => {
      return n.id !== id;
    });
  });
}

export function handleEdit(uid, id, sl, l, editNote, setEditNote) {
  // var a = editNote;
  const payload = { ...editNote, createdTimestamp: Timestamp.now().seconds };
  const docref = doc(db, `users/${uid}/notes`, id);

  console.log("docref: ", docref);

  (async () => {
    const ss = await setDoc(docref, payload);
    // console.log("Note updated: ", ss.id);
  })().catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + errorMessage);
  });

  // console.log("payload: ", payload);
  // // console.log("return: ", k);
  setEditNote("");

  // function sendToBackend() {
  //   const payload = {
  //     title: h1.innerHTML,
  //     content: p.innerHTML,
  //   };

  //   const docref = doc(db, "myNotes", id);
  //   setDoc(docref, payload);
  //   // console.log(id);
  // }

  // function changingH1(e) {
  //   setEditNote((pv) => ({ title: e, content: pv.content }));
  //   sendToBackend();
  //   console.log("h1");
  // }

  // function changingP(e) {
  //   setEditNote((pv) => ({ title: pv.title, content: e }));
  //   sendToBackend();
  //   console.log("p");
  // }

  // function init(h1, p) {
  //   setEditNote(() => {
  //     return { title: h1.innerHTML, content: p.innerHTML };
  //   });
  // }

  // const editNoteDOM = document.querySelector("div#" + id);
  // const h1 = editNoteDOM.querySelector("h1");
  // const p = editNoteDOM.querySelector("p");
  // h1.setAttribute("contentEditable", "true");
  // p.setAttribute("contentEditable", "true");
  // init(h1, p);

  // h1.addEventListener("input", (e) => changingH1(e.target.innerHTML));
  // p.addEventListener("input", (e) => changingP(e.target.innerHTML));

  // h1.innerHTML = editNote.title;
  // p.innerHTML = editNote.content;

  // console.log(editNote);
  // console.log(editNoteDOM);
  // console.log(h1.innerHTML);
  // console.log(p.innerHTML);
}
