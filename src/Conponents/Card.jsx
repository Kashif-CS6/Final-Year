import React from 'react'
import './Card.css'
const Card = ({allcampaign,setOpenModel,setDonate,title}) => {
  
  
  console.log("The Campaigns: ",allcampaign);
  
  const daysLeft=(deadline)=>{{
    const difference=new Date(deadline).getTime() -Date.now();
    const reaminingDays=difference/(1000*3600*24)
    return reaminingDays.toFixed(0);
  }};
  return (
    <div>
      <div className="cardcontainer">
        <p className="titleforcam">{title}</p>
        <div className='allcard'>
          {allcampaign?.map((campaign,i)=>(
            <div
            onClick={()=>(setDonate(campaign),setOpenModel(true))}
            key={i+1}
            className='card'>
      <img style={{borderBottom:'1px solid #04F3F3', borderRadius:'1rem'}} src={campaign.imageurl}
      className='object-cover w-full h-64 rounded'
      alt="" 
       />
       <div className='cardin'>
        <p className='daysleft'>
          Days Left: {daysLeft(campaign.deadline)}

        </p>
        
  <p className='camtitle'>{campaign.title}</p>

<p className='camdiscription'>{campaign.description.slice(0,300)}  .....</p>
<div className='taraised'>
  <p className='child'>
    Target Amount: {campaign.target} ETH
  </p>
  <p className='child'>
    Raised: {campaign.amountCollected} ETH
  </p>
</div>
       </div>
      </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card