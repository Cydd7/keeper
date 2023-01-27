import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { login, logout, selectUser } from "./features/userSlice";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import RichTextbox from "./Areas/RichTextbox";
import LoadingScreen from "./Screens/LoadingScreen";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (userAuth) => {
      if (userAuth) {
        //Log in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //Log out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Router>
        {user === "loading" ? (
          <LoadingScreen />
        ) : user === null ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/r" element={<RichTextbox />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
