import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import MyHeader from './Componnents/MyHeader';
import MyTextComponnents from './Componnents/MainTextComponnents'
import MyVisualComponnents from './Componnents/MainVisualComponnents';
import MyButtons from './Componnents/MyButtons';


//url of backend
const URL = 'http://localhost:3001';

// make connection to backend
const socket = io.connect(URL);

/**
 * Home page
 */
const Home = () => {
  //data
  const [altitude, setAltitude] = useState(0)
  const [his     , setHis]      = useState(0);
  const [adi     , setAdi]      = useState(0);
  const [isText  , setIsText]   = useState(true);


  /**
   * set the new data that the server set.
   */
  useEffect(() => {
    socket.on("send_alt", altitude => {
      setAltitude(altitude);
    });
    socket.on("send_his", his => {
      setHis(his);
    });
    socket.on("send_adi", adi => {
      setAdi(adi);
    });
  }, [socket]);
  
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
          <MyHeader text='Welcome to Text Flight Simulation'/>

          <MyButtons onTextClick={textClick} onVisualClick={visualClick}/>
          
          <MyTextComponnents altitude={altitude} his={his} adi={adi}/>
        </div>
      ) : (
        <div className="App">
          <MyHeader text='Welcome to Visual Flight Simulation'/>

          <MyButtons onTextClick={textClick} onVisualClick={visualClick}/>
          
          <MyVisualComponnents />
        </div>
      )};
    </div>
  );
  
}

export default Home;