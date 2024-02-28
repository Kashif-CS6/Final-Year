import React, { useEffect, useContext, useRef } from "react";
import "./Head.css";
import { Link } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/react";
import site_logo from "../Accets/sa_logo.png";
// import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
//internal imports

import { Crowdfundingcontext } from "../../Context/Crowdfunding";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

export default function Head() {
  const { setCurrentAccount } = useContext(Crowdfundingcontext);
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();

  //Navbar responsive
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    setCurrentAccount(address);
  }, [address]);

  return (
    <header>
      <img src={site_logo} alt="website-Logo" />
      <div>
        <nav ref={navRef}>
          <Link to="/Index" state={{ waddress: address }}>
            Projects
          </Link>
          <Link to="/">Staking</Link>
          <Link to="/Swap">Swap</Link>
          <button className="btn-connect" 
              onClick={() =>
                address
                  ? chain?.id == chains[0]?.id
                    ? open()
                    : switchNetwork?.(chains[0]?.id)
                  : open()
              }>
                 {address ? (
                chain?.id == chains[0]?.id || chain?.id == chains[1]?.id ? (
                  address ? (
                    <>
                      {`${address.substring(0, 6)}...${address.substring(
                        address.length - 4
                      )}`}
                    </>
                  ) : (
                    <>
                      Connect
                    </>
                  )
                ) : (
                  "Switch Network"
                )
              ) : (
                <>
                  Connect
                </>
              )}
              </button>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes color="white" />
          </button>
        </nav>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaBars color="white" />
        </button>
      </div>
    </header>
  );
}
