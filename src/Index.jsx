
import React,{useEffect,useContext, useState} from 'react'
//internal Imports 
import { Crowdfundingcontext } from './Context/Crowdfunding';
import Card from './Conponents/Card';
import Hero from './Conponents/Hero';
import PupUp from './Conponents/PupUp';
// import { useLocation } from 'react-router-dom';
const Index=()=>{
  const{
    titleData,
    createCampaign,
    getCampaign,
    getUserCampaign,
    donate,
    getDonations,
  
  }=useContext(Crowdfundingcontext);
  const[allcampaign,setAllcampaign]=useState();
const [usercampaign,setUsercampaign]=useState();
// const location=useLocation();


useEffect(()=>{
  const getCampaignsData= getCampaign();
  const userCampaignsData=getUserCampaign();
  return async()=>{
   const allData=await getCampaignsData;
    const userData=await userCampaignsData;
    setAllcampaign(allData);
    setUsercampaign(userData)
  }
},[]);

//DONATE POPUP MODEL
const [openModel,setOpenModel]=useState(false);
const [donateCampaign,setDonateCampaign]=useState();
console.log(donateCampaign)
return(
  <>

  <Hero titleData={titleData} createCampaign={createCampaign}/>
  <Card
  title="All Listed Cmpaign"
  allcampaign={allcampaign}
  setOpenModel={setOpenModel}
  setDonate={setDonateCampaign}/>
<Card
  title="The User Campaign"
  allcampaign={usercampaign}
  setOpenModel={setOpenModel}
  setDonate={setDonateCampaign}/>
{openModel &&(
  <PupUp
  setOpenModel={setOpenModel}
  getDonations={getDonations}
  donate={donateCampaign}
  donateFunction={donate}/>
)}
  </>
)
}
export default Index;
