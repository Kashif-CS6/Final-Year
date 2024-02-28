import React, { useState, useEffect } from "react";
import "./popup.css";
import { FaTimes } from "react-icons/fa";

const PupUp = (
  { setOpenModel, donate, donateFunction, getDonations },
  props
) => {
  const [amount, setAmount] = useState("");
  const [allDonationData, setallDonationData] = useState();

  const createDination = async () => {
    try {
      const data = await donateFunction(donate.pId, amount);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const donationsListData = getDonations(donate.pId);
    return async () => {
      const donationData = await donationsListData;
      setallDonationData(donationData);
    };
  }, []);

  return (
    <>
      <div className="popup">
        <div className="popup-inner">
          <h1>{donate.title.slice(0,76)}</h1>
          <p>
            <span>Description</span>
            <br />
            <div className="description-container">
              <p className="description-content">{donate.description}</p>
            </div>
          </p>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Donate Amount"
            required
            min="1"
          />
          {allDonationData?.map((donate, i) => (
             <div className="description-container" style={{display:"flex",flexDirection:"column",maxWidth:"200px",maxHeight:"50px"}}>
              Donator:
             <p className="description-content" style={{fontSize:"0.4rem"}}> {i + 1}--Donated:{donate.donation}--
 {donate.donator.substring(0, 35)}</p>
           </div>
          ))}
          <div>
            <button className="btn-donate" onClick={() => setOpenModel(false)}>
              Close
            </button>
            <button className="btn-donate" onClick={() => createDination()}>
              Donate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PupUp;
