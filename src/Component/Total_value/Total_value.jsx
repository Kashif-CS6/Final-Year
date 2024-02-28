import React, { useEffect, useState } from "react";
import "./Total_value.css";
import Tab from "../Tab/Tab";
import { ARBStaking,ARBStaking_Abi } from "../../utilies/constant";
import Web3 from "web3";
import { useAccount } from "wagmi";

function Total_value() {

  const { address } = useAccount();
  const [totalUserAmount, settotalUserAmount] = useState(0)
  const [WithdrawReward, setWithdrawReward] = useState(0)

  const TotalAmount =async()=>{
    try{
      const webSupply = new Web3(
        "https://ethereum-sepolia.publicnode.com"
    );
    let stakingContractOf = new webSupply.eth.Contract(ARBStaking_Abi, ARBStaking);
    if (address) {
        let UserInformation = await stakingContractOf.methods
            .Users(address)
            .call();
           let UserInformationdata=UserInformation.DepositeToken/1000000000

           let WithdrawableAmount = await stakingContractOf.methods.pendingRewards(address).call();
            WithdrawableAmount=WithdrawableAmount/1000000000
           setWithdrawReward(parseFloat(WithdrawableAmount).toFixed(3))
            settotalUserAmount(UserInformationdata)
    }


    }catch(e){

    }
  }

  useEffect(() => {
    TotalAmount()
  })

  return (
    <>
      <div className="details-box">
        <h3>Total value locked</h3>
        <h1>{totalUserAmount} AKS</h1>
        <h3>Withdraw Reward</h3>
        <h1> {WithdrawReward} AKS</h1>
      </div>
      <div className="container">
        <div className="row  text-white">
          <div className="text-center m-auto">
            <Tab  totalUserAmount={totalUserAmount}  />
          </div>
        </div>
      </div>
    </>
  );
}

export default Total_value;
