import React, { useEffect, useState } from 'react'
import Countdown from "react-countdown";
import moment from "moment/moment";
import { Button, Popover } from "antd";

import {
    ARBStaking,
    ARBStaking_Abi
} from '../../utilies/constant';
import Web3 from 'web3';
import { toast } from 'react-toastify';
import './mylockStyle.css'
import { useAccount } from 'wagmi';
import {
    prepareWriteContract,
    waitForTransaction,
    writeContract,
} from "@wagmi/core";

export default function Mylock({ check }) {

    const { address } = useAccount();
    const [UserInformationStak, setUserInformationStak] = useState();
    const [spinner, setspinner] = useState(false)


    const webSupply = new Web3(
        "https://ethereum-sepolia.publicnode.com"
    );
    const checkBalance = async () => {
        let stakingContractOf

        stakingContractOf = new webSupply.eth.Contract(ARBStaking_Abi, ARBStaking);
        if (address) {
            let UserInformation = await stakingContractOf.methods
                .UserInformation(address)
                .call();
            let array1 = UserInformation[0];
            let array2 = UserInformation[1];
            let array3 = UserInformation[2];
            let myArray = [];
            let currentTime = Math.floor(new Date().getTime() / 1000.0);
            for (let i = 0; i < array1.length; i++) {
                let currentTimestamp = array3[i];
                let date = moment(Number(array3[i]) * 1000).format("DD-MM-YYYY");
                let obj = {
                    address: address,
                    amount: (array1[i] / 1000000000),

                    unLoackTime: Number(currentTimestamp) + Number(60) * array2[i],
                    LockTime: date,
                };
                myArray = [...myArray, obj];
            }

            setUserInformationStak(myArray);
        }
    };


    useEffect(() => {
        checkBalance()
    }, [])


    const Completionist = () => {


        return (
            <>
                <div style={{font:"0.8rem"}}>Unstaked Time Reached!</div>
            </>

        )


    }


    const renderer = ({ days, hours, minutes, seconds, completed }) => {

        if (completed) {

            return <Completionist />;
        } else {


            return (
                <div className="text_days fs-5 ">
                    {days}d : {hours}h : {minutes}m : {seconds}s


                </div>
            );
        }
    };




    const unstake = async (index) => {
        try {

            setspinner(true)
            const { request } = await prepareWriteContract({
                address: ARBStaking,
                abi: ARBStaking_Abi,
                functionName: "harvest",
                args: [[index]],
                account: address,
            });
            const { hash } = await writeContract(request);
            const data = await waitForTransaction({
                hash,
            });
            toast.success("Transaction Confirmed");
            setspinner(false)
            checkBalance()


        } catch (e) {
            console.log("Error while calling Unstaking function", e);
            setspinner(false)

        }
    };
    return (
        <div>

            <div className="container-fluid d-flex justify-items-center p-0" >

                <>
                    <div className='inner-container-history'>
                        <table class="table" >
                            <thead>
                                <tr>
                                    <th scope="col">Address</th>
                                    <th scope="col">Staked Amount</th>
                                    <th scope="col">Staked Time</th>
                                    <th scope="col">Remaining Time to Unstaked </th>
                                    <th scope="col">Unstaked</th>
                                </tr>
                            </thead>
                            <tbody className="text-white " >
                                {UserInformationStak?.map((items, index) => {


                                    return (
                                        <>
                                            {
                                                items.amount == 0 ?
                                                    <></>
                                                    :
                                                    <>
                                                        <tr>
                                                            <th scope="row">
                                                                {items.address?.substring(0, 4) +
                                                                    "..." +
                                                                    items.address?.substring(items.address?.length - 4)}
                                                            </th>
                                                            <td>{items.amount}</td>
                                                            <td>{items.LockTime}</td>
                                                            <td className='time-reach'>
                                                                {" "}
                                                                <Countdown
                                                                    date={
                                                                        Date.now() +
                                                                        (parseInt(items.unLoackTime) * 1000 - Date.now())
                                                                    }
                                                                    renderer={renderer}
                                                                />
                                                            </td>

                                                            <td>

                                                                <Button

                                                                    onClick={() => parseInt(items.unLoackTime) >= parseInt(Date.now() / 1000) ? toast.error("unstake time not reached!") : unstake(index)}

                                                                    className="unlockBTN text-white"
                                                                >
                                                                    UnStake
                                                                </Button>
                                                            </td>

                                                        </tr>
                                                    </>

                                            }

                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>

            </div>

        </div>
    )
}
