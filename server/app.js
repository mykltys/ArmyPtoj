const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require('cors');
app.use(cors());

const readline = require('readline');
const cl = readline.createInterface( process.stdin, process.stdout );

//url of frontend
const URL = 'http://localhost:3000';

// backend port
const PORT = 3001;

// data
let altitude = 0;  // 0 - 3000
let his      = 0;  // 0 - 360
let adi      = 0;  // -100 - 100

// server
const server = http.createServer(app);

//filter connection
const io = new Server(server, {
  cors:{
    origin: URL,
    methods: ["GET", "POST"],
  },
});

// list of all client that connected
let all_sockets = [];

// when client connecting
io.on("connection", (socket) => {
  socket.emit("send_alt", altitude);
  socket.emit("send_his", his);
  socket.emit("send_adi", adi);
  all_sockets.push(socket);

  //when client disconnecting
  socket.on("disconnect", () => {
    let index = all_sockets.indexOf(socket);
    all_sockets.splice(index, 1);
  })
});

/**
 * after the server up let user play in the console...
 */
const interact_user = () => 
{
  console.log("server start...");
  /**
  * open the option to make post request.
  */
  const send_all = async () => {
    if(altitude < 0 || altitude > 3000)
      altitude = 0;

    if(his < 0 || his > 360)
      his = 0;

    if(adi < -100 || adi > 100)
      adi = 0;
    all_sockets.forEach(socket => {
      socket.emit("send_alt", altitude);
      socket.emit("send_his", his);
      socket.emit("send_adi", adi);
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
};

// start server
server.listen(PORT, interact_user);