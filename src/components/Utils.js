import {
  query,
  addDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
  Timestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";
import db from "../firebase";

export const authenticateUser = (e, task, emailRef, passwordRef) => {
  e.preventDefault();
  if(emailRef.current.value.length!==0 && passwordRef.current.value.length!==0){
    if (task === "register") {
      createUserWithEmailAndPassword(
        getAuth(),
        emailRef.current.value,
        passwordRef.current.value
      ).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/email-already-in-use'){
          alert("User already exists with the email entered");
        }
        else{
          alert(errorMessage)
        }
      });
    } else if (task === "signin") {
      signInWithEmailAndPassword(
        getAuth(),
        emailRef.current.value,
        passwordRef.current.value
      ).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/user-not-found'){
          alert('User does not exist')
        }
        else{
          alert(errorMessage);
        }
      });
    }
  }
  else{
    alert("Please enter Email and Password")
  }
};

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

export function handleEditSubmit(uid, id, sl, l, editNote, setEditNote) {
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

  setEditNote("");
}

export const settingNotesList = (user, setList, setNotesList) => {
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
    return setNotesList(
      snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  });
};

export const mySvgIcons = (icon) => {
  switch (icon) {
    case "user":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="Login-icon"
          viewBox="0 0 1792 1792"
        >
          <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
        </svg>
      );
    case "lock":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="Login-icon"
          viewBox="0 0 1792 1792"
        >
          <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
        </svg>
      );
    case "arrow":
      return (
        <svg
          style={{ padding: "0" }}
          xmlns="http://www.w3.org/2000/svg"
          className="Login-icon"
          viewBox="0 0 1792 1792"
        >
          <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
        </svg>
      );
    default:
      return <></>;
  }
};
