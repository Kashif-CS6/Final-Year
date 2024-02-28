import React, { useState, useEffect } from "react";
import Web3modal from "web3modal";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
//internal import
import { Crowdfundingaddress, crowdfundingabi } from "./constant";

// fetching smart contract
const fetchcontract = (signerorprovider) => {
  return new ethers.Contract(
    Crowdfundingaddress,
    crowdfundingabi,
    signerorprovider
  );
};

export const Crowdfundingcontext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
  const { address } = useAccount();
  const titleData = " CrowdFunding data";
  const [currentAccount, setCurrentAccount] = useState("");

  const createCampaign = async (campaign) => {
    if (!currentAccount) {
      toast.error("Connect your wallet first");
      console.log("Main bhol gia");
    } else {
      console.log("Main yahan punch gia");
      const { title, description, amount, deadline, imageurl } = campaign;
      console.log(
        "Owner of Campaign: ",
        currentAccount,
        " Title: ",
        title,
        " Description: ",
        description,
        " Amount: ",
        ethers.utils.parseUnits(amount, 18).toString(),
        " Deadline: ",
        new Date(deadline).getTime(),
        " Url of image: ",
        imageurl
      );
      const web3modal = new Web3modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchcontract(signer);

      try {
        const transaction = await contract.createCampaign(
          currentAccount, //owner
          title, // title
          description, //description
          ethers.utils.parseUnits(amount, 18).toString(),
          new Date(deadline).getTime(), //deadline
          imageurl
        );
        await transaction.wait();
        console.log("All contract Data", transaction);
        toast.success("Campaign is Uploaded");
        getCampaign();
        getUserCampaign();
      } catch (error) {
        console.log("contract call fail, ", error);
      }
    }
  };
  const getCampaign = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/a_lqfI5wJluRQ97wgP-McBNqy9cOg_2F"
    );
    const contract = fetchcontract(provider);
    const campaign = await contract.getCampaigns();
    const currentTimestamp = new Date().getTime();

    const parsedCampaigns = campaign
      ?.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        imageurl: campaign.imageurl,
        pId: i,
      }))
      .filter(
        (campaign) =>
          campaign.deadline > currentTimestamp &&
          campaign.amountCollected < campaign.target &&
          campaign.title != "Ahsan"
      );
    return parsedCampaigns;
  };
  const getUserCampaign = async () => {
    if (!address) {
      toast.warn("Connect Your wallet to get Campaign");
    } else {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/a_lqfI5wJluRQ97wgP-McBNqy9cOg_2F"
      );
      const contract = fetchcontract(provider);
      const allcampaign = await contract.getCampaigns();
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentTimestamp = new Date().getTime();
      const currentUser = currentAccount;
      console.log("This is in Get User Campaign: ", currentUser);
      const filterCampaigns = allcampaign?.filter(
        (campaign) => campaign.owner.toLowerCase() === accounts[0].toLowerCase()
      );
      console.log("This is in Get User Campaign: ", filterCampaigns);

      var userData = filterCampaigns
        .map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          imageurl: campaign.imageurl,
          pId: i,
        }))
        .filter(
          (campaign) =>
            campaign.deadline > currentTimestamp &&
            campaign.amountCollected < campaign.target
        );
      return userData;
    }
  };
  const donate = async (pId, amount) => {
    if (!currentAccount) {
      toast.error("Connect your wallet first");
    } else {
      const web3modal = new Web3modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchcontract(signer);
      const campaigndata = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
      });
      await campaigndata.wait();
      //location.reload();
      return campaigndata;
    }
  };
  const getDonations = async (pId) => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/a_lqfI5wJluRQ97wgP-McBNqy9cOg_2F"
    );
    const contract = fetchcontract(provider);
    const donations = await contract.getDonator(pId);
    const numberofdonations = donations[0].length;
    const parsedDonations = [];
    for (let i = 0; i < numberofdonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  /// Check if wallet is connected

  const ifwalltetconnect = async () => {
    try {
      if (!window.ethereum) {
        //        return setOpenError(true), setError("Install MetaMast");
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("Account isn't found");
      }
    } catch (error) {
      console.log("So defficulties to find the account");
    }
  };

  useEffect(() => {
    setCurrentAccount(address);
  }, [address]);

  // connect wallet function

  const connectwallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install the MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const acc = accounts[0];
      setCurrentAccount((prevAccount) => {
        // Ensure the state is updated correctly
        if (prevAccount !== acc) {
          console.log("Updating current account:", acc);
          return acc;
        } else {
          return prevAccount;
        }
      });

      console.log(`This is current account lund: ${currentAccount}`);
    } catch (error) {
      console.log("Something went wrong while connection to wallet ", error);
    }
  };

  return (
    <Crowdfundingcontext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaign,
        getUserCampaign,
        donate,
        getDonations,
        connectwallet,
        setCurrentAccount,
      }}
    >
      {children}
    </Crowdfundingcontext.Provider>
  );
};
