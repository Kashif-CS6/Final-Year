import React, { useCallback } from 'react'
import Head from './Component/Head/Head'
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';
import { loadFull } from "tsparticles";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Main_home_page from './Component/Main_home_page/Main_home_page';
import Footer_up from './Component/Footer_up/Footer_up';
import Swap from './Component/Swap/Swap';
import NavBar from './Conponents/NavBar';
import {CrowdFundingProvider} from './Context/Crowdfunding'
import Index from './Index.jsx';

function App() {


  return (
    <div className='' >
      <div className='back'>
      <CrowdFundingProvider>
        <ToastContainer />
        <Head />
        <Routes>
          
          <Route path='/' element={<Main_home_page />} />
          <Route path='/Swap' element={<Swap />} />
          <Route path='/Index' element={<Index/>}/>

        </Routes>
        <Footer_up />
        </CrowdFundingProvider>
      </div>
    </div>
  )
}

export default App
