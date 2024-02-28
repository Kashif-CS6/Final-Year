import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Web3 from "web3";
import {
  ARBStaking,
  ARBStaking_Abi,
  ARBtoken,
  ARBtoken_Abi,
} from "../../utilies/constant";

import "./Lockestake.css";

import { useAccount } from "wagmi";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";

function Lockestake() {
  const { address } = useAccount();
  const [selectDays, setselectDays] = useState(0);
  const [selectpercent, setpercent] = useState(0);
  const [getValue, setgetValue] = useState(0);
  const [Active, setActive] = useState(0);
  const [spinner, setspinner] = useState(false);
  const [balance, setbalance] = useState(0);

  const webSupply = new Web3("https://ethereum-sepolia.publicnode.com");

  const staking_Amount = async () => {
    try {
      if (selectDays == 1) {
        toast.error("Please Select Days");
        setspinner(false);
      } else {
        if (getValue == null) {
          toast.error("Please Enter Amount First!");
          setspinner(false);
        } else {
          if (getValue < 1) {
            toast.error("Minimum Staking Amount 1!");
            setspinner(false);
          } else {
            if (!address) {
              toast.error("Please Connect Metamaske First!");
            } else {
              setspinner(true);

              let stakingValue = getValue * 1000000000000000000;

              let checkbalance = balance * 1000000000000000000;

              if (Number(checkbalance) >= Number(stakingValue)) {
                const { request } = await prepareWriteContract({
                  address: ARBtoken,
                  abi: ARBtoken_Abi,
                  functionName: "approve",
                  args: [ARBStaking, stakingValue.toString()],
                  account: address,
                });
                const { hash } = await writeContract(request);
                const data = await waitForTransaction({
                  hash,
                });

                setTimeout(async () => {
                  toast.success("Approve Confirmed");
                  const { request } = await prepareWriteContract({
                    address: ARBStaking,
                    abi: ARBStaking_Abi,
                    functionName: "farm",
                    args: [stakingValue.toString(), selectDays],
                    account: address,
                  });
                  const { hash } = await writeContract(request);
                  const data = await waitForTransaction({
                    hash,
                  });
                  toast.success("AKS Token Staked Successfull.");
                  setspinner(false);
                }, 1000);
              } else {
                toast.error("Insufficient Balance");
                setspinner(false);
              }
            }
          }
        }
      }
    } catch (e) {
      console.log("Error", e);
      setspinner(false);
    }
  };

  //ByDefault Call
  const checkBalance = async () => {
    let tokenContractOf = new webSupply.eth.Contract(ARBtoken_Abi, ARBtoken);
    let stakingContractOf = new webSupply.eth.Contract(
      ARBStaking_Abi,
      ARBStaking
    );

    if (address) {
      let blanceOf = await tokenContractOf.methods.balanceOf(address).call();

      blanceOf = blanceOf / 1000000000000000000;
      blanceOf = blanceOf.toString();

      blanceOf = blanceOf.slice(0, 15);
      setbalance(blanceOf);
    }
  };

  useEffect(() => {
    checkBalance();
  });

  return (
    <>
      <div className="main-container">
        <div className="sub-container">
          <div className="col-lg-5 all_main">
            <h3 className=" side-font adjust-title">Stake AKS </h3>

            <div className="mt-4  px-2">
              <div className="d-flex justify-content-between mb-2">
                <span className="side-font">Amount [Min: 1 AKS]</span>
                <p>
                  <span> ~My balance:</span> <span>{balance} </span>
                </p>
              </div>
              <div className=" border upper-AKS-Token ">
                <div>
                  <span className="side-font">AKS TOKEN</span>
                  <input
                    className="input-handle side-font"
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    autoComplete="off"
                    autoCorrect="off"
                    min="0"
                    aria-aria-valuemin="0"
                    aria-valuemax="9007199254740991"
                    onChange={(e) => setgetValue(e.target.value)}
                    value={getValue}
                  />
                </div>
                <div className="max-btn-div">
                  <button
                    className="max-button-liquidity"
                    onClick={() => setgetValue(balance)}
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 px-2">
              <p className="text-start side-font mb-2" style={{fontWeight:"700"}}>Locking Time</p>
              <div>
                <div className="dan_gtr text-white">
                  <div
                    className=" border des_tw p-0 "
                    style={{
                      background:
                        Active == 1
                          ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                          : "#000",
                    }}
                  >
                    <button
                      className="btn btn-md dates"
                      onClick={() => (
                        setselectDays(30),
                        setActive(1),
                        setpercent((getValue * 1) / 100)
                      )}
                    >
                      30 Days
                    </button>
                    <div className="select-limit border-top">12 % APY</div>
                  </div>
                  <div
                    className=" border des_tw p-0"
                    style={{
                      background:
                        Active == 2
                          ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                          : "#000",
                    }}
                  >
                    <button
                      className="btn btn-md dates"
                      onClick={() => (
                        setselectDays(90),
                        setActive(2),
                        setpercent((getValue * 4.5) / 100)
                      )}
                    >
                      90 Days
                    </button>
                    <div className="select-limit border-top">18 % APY</div>
                  </div>
                  <div
                    className=" border des_tw p-0"
                    style={{
                      background:
                        Active == 3
                          ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                          : "#000",
                    }}
                  >
                    <button
                      className="btn btn-md dates"
                      onClick={() => (
                        setselectDays(180),
                        setActive(3),
                        setpercent((getValue * 12) / 100)
                      )}
                    >
                      180 Days
                    </button>
                    <div className="select-limit border-top">24 % APY</div>
                  </div>
                  <div
                    className="border des_tw p-0"
                    style={{
                      background:
                        Active == 4
                          ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                          : "#000",
                    }}
                  >
                    <button
                      className="btn btn-md dates"
                      onClick={() => (
                        setselectDays(360),
                        setActive(4),
                        setpercent((getValue * 30) / 100)
                      )}
                    >
                      360 Days
                    </button>
                    <div className="select-limit border-top">30 % APY</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="mt-3 enable-button"
              onClick={() => staking_Amount()}
            >
              {spinner == true ? (
                <>
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                " Enable Staking"
              )}
            </button>

            <div className="last mt-4">
              <p className="fon m-0 py-2 side-font">
                Locking {getValue} AKS for {selectDays} Days, You will get{" "}
                {selectpercent} reward
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lockestake;
