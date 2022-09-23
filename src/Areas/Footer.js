import React from "react";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return <p className="Footer">ⓒ{year} Siddhant Lodha</p>;
}

export default Footer;
