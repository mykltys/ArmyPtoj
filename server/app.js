const express = require("express");
const cors = require('cors');
const readline = require('readline');

const cl = readline.createInterface( process.stdin, process.stdout );

const app = express();
app.use(cors());
app.use(express.json());

const ROUTE_ALTITUDE = '/Altitude';
const ROUTE_HIS = '/His';
const ROUTE_ADI = '/Adi';
const PORT = 2000;

let altitude = 0;  // 0 - 3000
let his      = 0;  // 0 - 360
let adi      = 0;  // -100 - 100


app.listen(PORT);
console.log('app running... ' + PORT)

/**
 * open the option to make post request.
 */
const send_all = async () => {
    if(altitude < 0 || altitude > 3000)
      altitude = 0;
    app.post(ROUTE_ALTITUDE, (req,res) => {
      res.json(altitude);
    });
    

    if(his < 0 || his > 360)
      his = 0;
      app.post(ROUTE_HIS, (req,res) => {
        res.json(his);
      });

    if(adi < -100 || adi > 100)
      adi = 0;
      app.post(ROUTE_ADI, (req,res) => {
        res.json(adi);
      });
};

/**
 * 
 * @param {string} q - question to the user.
 */

const question = (q) => {
  return new Promise( (res, rej) => {
      cl.question( q, answer => {
          res(answer);
      })
  });
};

/**
 * get input untill ctrl + C.
 */
const run = async () => {
    while ( true ) 
    {
      console.log('');
      altitude = await question('altitude: ');
      console.log('');
      his      = await question('his: ');
      console.log('');
      adi      = await question('adi: ');
      console.log('');
      await question('Press any key\n');
      console.log('>Sending Data');
      await send_all();
    }
  };

run();