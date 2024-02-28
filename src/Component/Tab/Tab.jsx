import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Lockestake from "../Lockestak/Lockestake";
import "./Tab_style.css";
import Mylock from "../myLock/Mylock";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
   <>
      {value == index && (
          <Typography>{children}</Typography>
      )}
  </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



export default function BasicTabs({ totalUserAmount }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
          <Tabs
          TabIndicatorProps={{
            style: {
              display: 'none'
            }
          }}
            value={value}
            onChange={handleChange}
           
            className="tab-css"
            centered
          >
            <Tab
              className="text-light mak_flxx_bttn"
              label="Stake"
             
            />
            <Tab
              className="text-light mak_flxx_bttn"
              label="Staked History"
             
            />
             
          </Tabs>
      <div style={{borderBottom:'1px solid cyan',paddingBottom:'1rem'}}> 
        <TabPanel value={value} index={1}>
          <Mylock />
        </TabPanel>
        <TabPanel value={value} index={0}>
          <div class="staking">
            <h2 class="staking__heading">TOTAL AKS LOCKED</h2>
            <div class="staking__tvl">
              <span class="staking__tvl_text">
                Total AKS in Locked Staking
              </span>
              <span
                class="staking__tvl_text"
                style={{ color: "rgb(255, 255, 255)", fontWeight: "700" }}
              >
                {totalUserAmount} AKS
              </span>
            </div>
          </div>

          <Lockestake />
        </TabPanel>
        </div>
    </>
  );
}