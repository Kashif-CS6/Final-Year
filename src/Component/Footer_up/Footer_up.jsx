import React from "react";
import logo from "../../Component/Accets/sa_logo.png";
import '../Footer_up/Footer.css'

import { BsDiscord, BsTelegram } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";

export default function Footer_up() {
  return (
    <div className="footer">
      <div className="image">
        <img src={logo} alt="logo-img" />
      </div>
      <div className="details">
        <h1>Social Links</h1>
        <p>
          <BsDiscord color="white" size={35}/>
          <BsTelegram color="white" size={35}/>
          <FaTwitter color="white" size={35}/>
        </p>
      </div>
    </div>
  );
}
