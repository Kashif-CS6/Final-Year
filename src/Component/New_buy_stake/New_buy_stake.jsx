import React from "react";
import "./New_buy_stake.css";

export default function New_buy_stake() {
  return (
    <div className="py-5 bbor px-2">
      <div className="conatiner text-center">
        <h1 className="site_font main_interation">
          The future of social interaction
        </h1>
        <p className="site_font">
          Refer your friend and your favorite co creators to join the
          AKS staking and get reward in AKS
        </p>
        <div className="two_new_btnn d-flex gap-3 justify-content-center py-4">
          <button className="site_button ">Buy now</button>
          <button className="second_site_button">Stake now</button>
        </div>
      </div>
    </div>
  );
}
