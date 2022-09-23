import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import RichTextbox from "./Areas/RichTextbox";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Setting user
  useEffect(() => {
    onAuthStateChanged(getAuth(), (userAuth) => {
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
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/r" element={<RichTextbox />} />
            {/* <Route path="/account" element={<AccountScreen />} /> */}
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
