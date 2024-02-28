import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import Web3 from "web3";
import bnb from "../Accets/bnb.png";
import "./Swap.css";

import Modal from "react-bootstrap/Modal";

import {
  Presale_Contract,
  Presale_Abi,
  Presale_Token_Abi,
  Presale_Token_Address,
  BTC_token,
  BTC_token_Abi,
  LTC_token,
  LTC_token_Abi,  
  USDT_token,
  USDT_token_Abi,
  BUSD_token,
  BUSD_token_Abi,
} from "../../utilies/constant";
import { useEffect } from "react";
import { Spin } from "antd";
import { useWeb3Modal } from "@web3modal/react";
import axios from "axios";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";

function MyVerticallyCenteredModal2(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div
          className="popup"
          role="dialog"
          aria-modal="true"
          data-testid="modal"
        >
          <div class="popup-inner">
            <div class="popup-title">
              <h2>Select Token</h2>
            </div>

            <div className="token-container">
              <div className="token-details">
                <div
                  className="token"
                  onClick={() => {
                    props.setModelOne("binance-usd");
                    props.settokenBalanceCopy(
                      "https://raw.githubusercontent.com/dappradar/tokens/main/binance-smart-chain/0xe9e7cea3dedca5984780bafc599bd69add087d56/logo.png"
                    );
                    props.setToken_Name("BUSD");
                    props.onHide();
                  }}
                ><img
                 src="https://raw.githubusercontent.com/dappradar/tokens/main/binance-smart-chain/0xe9e7cea3dedca5984780bafc599bd69add087d56/logo.png"
                  alt="USD-Image"
                  style={{ maxWidth: "25px" }}
                  />
                  <span>BUSD</span>
                </div>
                <div
                  className="token"
                  onClick={() => {
                    props.setModelOne("tether");
                    props.onHide();
                    props.settokenBalanceCopy(
                      "https://raw.githubusercontent.com/dappradar/tokens/main/binance-smart-chain/0x55d398326f99059ff775485246999027b3197955/logo.png"
                    );
                    props.setToken_Name("USDT");
                  }}
                >
                   <img
                    src="https://raw.githubusercontent.com/dappradar/tokens/main/binance-smart-chain/0x55d398326f99059ff775485246999027b3197955/logo.png"
                    alt="Dosa"
                    style={{ maxWidth: "25px" }}
                  />
                  <span>USDT</span>
                </div>
                <div className="token"
                onClick={() => {
                  props.setModelOne("litecoin");
                  props.settokenBalanceCopy(
                    "https://raw.githubusercontent.com/dappradar/tokens/main/binance-smart-chain/0x4338665cbb7b2485a8855a139b75d5e34ab0db94/logo.png"
                  );
                  props.setToken_Name("LTC");

                  props.onHide();
                }}
                >
                   <img
                        src="https://raw.githubusercontent.com/dappradar/tokens/main/binance-smart-chain/0x4338665cbb7b2485a8855a139b75d5e34ab0db94/logo.png"
                        alt="Strudel Finance"
                        style={{ maxWidth: "25px" }}
                      />
                      <span>LTC</span>
                </div>
                <div className="token"
                 onClick={() => {
                  props.setModelOne("bitcoin");
                  props.settokenBalanceCopy(
                    "https://raw.githubusercontent.com/dappradar/tokens/main/binance-smart-chain/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c/logo.png"
                  );
                  props.setToken_Name("BTC");

                  props.onHide();
                }}
                >
                  <img
                        src="https://raw.githubusercontent.com/dappradar/tokens/main/binance-smart-chain/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c/logo.png"
                        alt="0xBitcoin Token"
                        style={{ maxWidth: "25px" }}
                      />
                      <span>BTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* -------- POP UP DIV-COMPLETED */}
      </Modal.Body>
    </Modal>
  );
}
export default function Swap() {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const [modalShow2, setModalShow2] = React.useState(false);

  const [modelOne, setModelOne] = useState("binance-usd");

  const [tokenValue, setTokenValue] = useState("");
  const [Max_Balace, setMax_Balace] = useState("");

  const [tokenBalance, settokenBalance] = useState("");
  const [tokenBalancecOPY, settokenBalanceCopy] = useState(bnb);
  const [Spinner, setSpinner] = useState(false);
  const [getBNB_Value, setgetBNB_Value] = useState("");
  const [Token_Name, setToken_Name] = useState("BUSD");
  const [Api_Spinner, setApi_Spinner] = useState(false);

  const webSupply = new Web3("https://eth-sepolia.public.blastapi.io");

  const Swap = async () => {
    try {
      setSpinner(true);
      if (!address) {
        toast.error("Connect Wallet First");
        setSpinner(false);
      } else {
        if (getBNB_Value == "") {
          toast.error("Please Enter Token First ! ");
          setSpinner(false);
        } else {
          if (Number(getBNB_Value) > Number(Max_Balace)) {
            toast.error("Insuficent Balace");
            setSpinner(false);
          } else {
            setSpinner(true);
            let value = webSupply.utils.toWei(getBNB_Value.toString());
            let tokenValues = webSupply.utils.toWei(tokenValue.toString());
            //bticoin
            if (modelOne == "bitcoin") {
              setSpinner(true);

              const { request } = await prepareWriteContract({
                address: BTC_token,
                abi: BTC_token_Abi,
                functionName: "approve",
                args: [Presale_Contract, value],
                account: address,
              });
              const { hash } = await writeContract(request);
              const data = await waitForTransaction({
                hash,
              });
              setTimeout(async () => {
                setSpinner(true);

                toast.success("Approved Successfully! 🎉");
                const { request } = await prepareWriteContract({
                  address: Presale_Contract,
                  abi: Presale_Abi,
                  functionName: "swapBTCTotoken",
                  args: [value.toString(), tokenValues],
                  account: address,
                });
                const { hash } = await writeContract(request);
                const data = await waitForTransaction({
                  hash,
                });
                toast.success("Buy Successfully! 🎉");
                setSpinner(false);
              }, 2000);
            }//litecoin 
            else if (modelOne == "litecoin") {
              const { request } = await prepareWriteContract({
                address: LTC_token,
                abi: LTC_token_Abi,
                functionName: "approve",
                args: [Presale_Contract, value],
                account: address,
              });
              const { hash } = await writeContract(request);
              const data = await waitForTransaction({
                hash,
              });
              setTimeout(async () => {
                toast.success("Approved Successfully! 🎉");
                const { request } = await prepareWriteContract({
                  address: Presale_Contract,
                  abi: Presale_Abi,
                  functionName: "swapLTCTotoken",
                  args: [value.toString(), tokenValues],
                  account: address,
                });
                const { hash } = await writeContract(request);
                const data = await waitForTransaction({
                  hash,
                });
                toast.success("Buy Successfully! 🎉");
                setSpinner(false);
              }, 2000);
            }//tether  
            else if (modelOne == "tether") {
              setSpinner(true);

              const { request } = await prepareWriteContract({
                address: USDT_token,
                abi: USDT_token_Abi,
                functionName: "approve",
                args: [Presale_Contract, value],
                account: address,
              });
              const { hash } = await writeContract(request);
              const data = await waitForTransaction({
                hash,
              });
              setTimeout(async () => {
                setSpinner(true);

                toast.success("Approved Successfully! 🎉");
                const { request } = await prepareWriteContract({
                  address: Presale_Contract,
                  abi: Presale_Abi,
                  functionName: "swapUSDTTotoken",
                  args: [value.toString(), tokenValues],
                  account: address,
                });
                const { hash } = await writeContract(request);
                const data = await waitForTransaction({
                  hash,
                });
                toast.success("Buy Successfully! 🎉");
                setSpinner(false);
              }, 2000);
            }//binance- 
            else if (modelOne == "binance-usd") {
              setSpinner(true);

              const { request } = await prepareWriteContract({
                address: BUSD_token,
                abi: BUSD_token_Abi,
                functionName: "approve",
                args: [Presale_Contract, value],
                account: address,
              });
              const { hash } = await writeContract(request);
              const data = await waitForTransaction({
                hash,
              });
              setTimeout(async () => {
                setSpinner(true);

                toast.success("Approved Successfully! 🎉");
                const { request } = await prepareWriteContract({
                  address: Presale_Contract,
                  abi: Presale_Abi,
                  functionName: "swapBUSDTotoken",
                  args: [value.toString(), tokenValues],
                  account: address,
                });
                const { hash } = await writeContract(request);
                const data = await waitForTransaction({
                  hash,
                });
                toast.success("Buy Successfully! 🎉");
                setSpinner(false);
              }, 2000);
            }

            setSpinner(false);
          }
        }
      }
    } catch (error) {
      setSpinner(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const bnbtoToken = async () => {
    try {
      if (address) {
        if (getBNB_Value == "") {
          setTokenValue("");
        } else {
          setApi_Spinner(true);
        }
        const webSupply = new Web3("https://eth-sepolia.public.blastapi.io");
        let Presale_ContractOf = new webSupply.eth.Contract(
          Presale_Abi,
          Presale_Contract
        );
        let BUSD_ContractOf = new webSupply.eth.Contract(
          Presale_Token_Abi,
          Presale_Token_Address
        );

        let res = await axios.get(
          `https://archievault.archievault.net/Live_Rate?Coin=${modelOne}`
        );

        res = res?.data?.data?.data;
        // console.log("Check", res);
        let balanceOf;
        ///////
           if (modelOne == "bitcoin") {
          var { 1: number } = res;
          let BTC_ContractOf = new webSupply.eth.Contract(
            BTC_token_Abi,
            BTC_token
          );
          balanceOf = await BTC_ContractOf.methods.balanceOf(address).call();
        }
        /// 
        else if (modelOne == "litecoin") {
          var { 2: number } = res;
          let LTC_ContractOf = new webSupply.eth.Contract(
            LTC_token_Abi,
            LTC_token
          );
          balanceOf = await LTC_ContractOf.methods.balanceOf(address).call();
        }
        /////// 
         else if (modelOne == "tether") {
          var { 825: number } = res;
          let USDT_ContractOf = new webSupply.eth.Contract(
            USDT_token_Abi,
            USDT_token
          );
          balanceOf = await USDT_ContractOf.methods.balanceOf(address).call();
        } 
        ////////////////////
        else if (modelOne == "binance-usd") {
          var { 4687: number } = res;
          let BUSD_ContractOf = new webSupply.eth.Contract(
            BUSD_token_Abi,
            BUSD_token
          );
          balanceOf = await BUSD_ContractOf.methods.balanceOf(address).call();
          console.log("balanceOf", balanceOf);
        }  

        setMax_Balace(balanceOf);
        settokenBalance(balanceOf.slice(0, 10));
        let Token_Price = number?.quote?.USD?.price;

        let value = parseFloat(Token_Price * getBNB_Value).toFixed(2);

        let token_value = webSupply.utils.toWei(value.toString());
        let getValue = await Presale_ContractOf.methods
          .CalculateToken(token_value.toString())
          .call();

        getValue = webSupply.utils.fromWei(getValue.toString());

        setTokenValue(getValue);
        setApi_Spinner(false);
      } else {
        toast.error("Connect Wallet First");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getBNB_Value == "") {
      setTokenValue("");
    }
    if (address) {
      bnbtoToken();
    }
  }, [getBNB_Value, modelOne, address]);

  return (
    <div>
      <div className="swap-main-container pt-5">
        <div class="swap-second-container">
          <div class="swap-title">
            <h1>
              <span>Token swap</span>
            </h1>
          </div>
          <div>
            <div class="swap-inner-container">
              <div class="swap-inner-boxes">
                <div class="upper-from">
                  <div>From</div>
                  <div>Balance:{tokenBalance} </div>
                </div>
                <div class="lower-from">
                  <input
                    title="Token Amount"
                    type="number"
                    placeholder="0.0"
                    class="input-box-from"
                    onChange={(e) => setgetBNB_Value(e.target.value)}
                    defaultValue={getBNB_Value}
                  />
                  <button
                    type="button"
                    className="max-button"
                    onClick={() =>
                      setgetBNB_Value(
                        modelOne == "bnb"
                          ? Number(Max_Balace) - Number(0.05)
                          : Max_Balace
                      )
                    }
                  >
                    Max
                  </button>
                  <button
                    type="button"
                    className="token-detail-name-img"
                    onClick={() => setModalShow2(true)}
                  >
                    <img
                      src={tokenBalancecOPY}
                      alt="Ether"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <span>{Token_Name}</span>
                  </button>
                </div>
               {modalShow2 &&( <MyVerticallyCenteredModal2
                  show={modalShow2}
                  setModelOne={setModelOne}
                  onHide={() => setModalShow2(false)}
                  settokenBalanceCopy={settokenBalanceCopy}
                  setToken_Name={setToken_Name}
                />)}
              </div>
            </div>
          </div>

          <div>
            <div class=" swap-inner-container mt-3">
              <Spin tip="Loading..." spinning={Api_Spinner}>
                <div class="swap-inner-boxes">
                  <div class="upper-to">
                    <div>To</div>
                  </div>
                  <div class="lower-to">
                    <input
                      title="Token Amount"
                      type="text"
                      placeholder="0.0"
                      className="input-box-to"
                      value={tokenValue}
                    />
                    <button type="button">
                      <span> AKS Token</span>
                    </button>
                  </div>
                </div>
              </Spin>
            </div>
          </div>
          {address ? (
            <>
              <button
                type="button"
                width="100%"
                class="swap-button"
                onClick={() => Swap()}
              >
                {Spinner ? (
                  <>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                ) : (
                  <>{!address ? "Connect Wallet" : "Swap"}</>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                width="100%"
                className="swap-button"
                onClick={() =>
                  address
                    ? chain?.id == chains[0]?.id
                      ? open()
                      : switchNetwork?.(chains[0]?.id)
                    : open()
                }
              >
                {Spinner ? (
                  <>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                ) : (
                  <>{!address ? "Connect Wallet" : "Swap"}</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}