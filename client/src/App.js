import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button } from "rsuite";
import axios from 'axios';

import './App.css';
import "rsuite/dist/rsuite.min.css";

//url of backend
const URL = 'http://localhost:2000/';

const ROUTE_ALTITUDE = 'Altitude';
const ROUTE_HIS = 'His';
const ROUTE_ADI = 'Adi';

/**
 * Home page
 */
const Home = () => {
  const [altitude, setAltitude] = useState(0)
  const [his     , setHis]      = useState(0);
  const [adi     , setAdi]      = useState(0);
  const [isText  , setIsText]   = useState(true);


  /**
   * make all post request to backend.
   */
  const getData = async () => {
       await axios.post(URL + ROUTE_ALTITUDE)
      .then((response) => {
        console.log(response.status, response.data.token);
        setAltitude(response.data);
      }).catch(() => {});
      
      await axios.post(URL + ROUTE_HIS)
      .then((response) => {
        console.log(response.status, response.data.token);
        setHis(response.data);
      }).catch(() => {});
      
      await axios.post(URL + ROUTE_ADI)
      .then((response) => {
        console.log(response.status, response.data.token);
        setAdi(response.data);
      }).catch(() => {});
  }

  getData();
  
  /**
   * make the page as text.
   */
  const textClick = () => {
   setIsText(true)
  }
  
  /**
   * make the page as visual.
   */
  const visualClick = () => {
    setIsText(false)
  };

  return (
    <div className="App">
      {isText ? (
        <div className="App">
          <header className='App-header'>
            <h2 className='App-title'>Welcome to Text Flight Simulation</h2>
          </header>
          <ButtonGroup style={{ margin: "20px" }} vertical>
            <Button    style={{ margin: "10px" }} onClick={textClick}  > Text   </Button>
            <Button    style={{ margin: "10px" }} onClick={visualClick}> Visual </Button>
          </ButtonGroup>
          <div
            style={{
              display       : 'flex',
              textAlign     : "center",
              justifyContent: 'center',
            }}
          > 
            <p style={{margin:50}} onChange={(e) => {setAltitude(e.target.value)}}> Altitude: {altitude}</p>
            <p style={{margin:50}} onChange={(e) => {setAltitude(e.target.value)}}> His     : {his}     </p>
            <p style={{margin:50}} onChange={(e) => {setAltitude(e.target.value)}}> Adi     : {adi}     </p>
          </div>
        </div>
      ) : (
        <div className="App">
          <header className='App-header'>
            <h2 className='App-title'>Welcome to Visual Flight Simulation</h2>
          </header>
          <ButtonGroup style={{ margin: "20px" }} vertical>
            <Button    style={{ margin: "10px" }} onClick={textClick}  > Text </Button>
            <Button    style={{ margin: "10px" }} onClick={visualClick}> Visual </Button>
          </ButtonGroup>
          <div
            style={{
                display       : 'flex',
                textAlign     : "center",
                justifyContent: 'center',
              }
            }
          >
            <p style={{margin:50}} onChange={(e) => {setAltitude(e.target.value)}}> Altitude: {altitude}</p>
            <p style={{margin:50}} onChange={(e) => {setAltitude(e.target.value)}}> His     : {his}     </p>
            <p style={{margin:50}} onChange={(e) => {setAltitude(e.target.value)}}> Adi     : {adi}     </p>
          </div>
        </div>
      )};
    </div>
  );
  
}

export default Home;