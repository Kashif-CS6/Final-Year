import React from "react";
import "./Updated.css";
import size from "../Accets/sa_logo.png";
import up from "../Accets/up.png";
import { FaWallet } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillKeyboardFill } from "react-icons/bs";
import { BsCheck2All } from "react-icons/bs";
import { FaMousePointer } from "react-icons/fa";

export default function Updated() {
  return (
    <div className="container2">
      <div className="upper-half">
      <h1>How to Stake AKS?</h1>
      <p>Before following the steps to stake your AKS , you will need to
          fund your wallet with AKS. Get your AKS by Swaping other tokens on our platform and then
          follow the steps on this app to stake your AKS to Earn AKS.
      </p>
      </div>
      <div className="lower-half">
        <div className="right">
          <img src={size} alt="logo of web" />
        </div>
        <div className="left">
          <div className="innerbox">
            <FaWallet size={25}/>
            <p>Connect your wallet</p>
          </div>
          <div className="innerbox">
            <BsFillKeyboardFill size={25}/>
            <p>Input the amount of AKS (Min:1AKS) to Stake</p>
          </div>
          <div className="innerbox">
            <BsCheck2All size={25}/>
            <p>Select 'LOCK' Period</p>
          </div>
          <div className="innerbox">
            <FaMousePointer size={25}/>
            <p>Select 'STAKE' Button</p>
          </div>
          <div className="innerbox">
            <BsCheck2All size={25}/>
            <p>Confirm transaction in your wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
