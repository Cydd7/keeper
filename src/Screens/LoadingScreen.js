import * as React from "react";

import "./LoadScreen.css";
import Header from "../Areas/Header";
import Loader from "../components/Loader";

export default function LoadingScreen() {
  return (
    <div className="LoadingScreen">
      <Header simple />
      <div className="LoadScreen-loader">
        <Loader />
      </div>
    </div>
  );
}
