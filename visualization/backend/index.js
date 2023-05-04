const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const { Server } = require("socket.io");
//const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const Delay = require("./models/delay.model");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// let isTimeout = 1 ;
// setTimeout(()=>{
//   if(isTimeout ===1) {
//     isTimeout = 0
//   }else {
//     isTimeout =1
//   }
// },10000)
let changes = []
let sockets = new Set();
const pipeline =[
  {
    $group: {
      _id: "$date",
      average_delay: { $avg: "$delay" },
    },
  },
]

mongoose
  .connect(process.env.DATABASE_URI ,{useNewUrlParser: true} )
  .then(() => {
  
  })
  .catch((e) => {console.log(e)

  });

io.on("connection", async (socket) => {
  sockets.add(socket);

 
  const docs = await Delay.aggregate([
    {
      $group: {
        _id: "$date",
        average_delay: { $avg: "$delay" },
      },
    },
  ]).exec();
  
  console.log("this")
  changes = docs
  io.emit("documents", changes);
});


Delay.watch().on("change",  async () => {

 
  const docs = await Delay.aggregate([
    {
      $group: {
        _id: "$date",
        average_delay: { $avg: "$delay" },
      },
    },
  ]).exec();
  console.log('that')
  changes = docs
 
  
  
});

setInterval(()=>{
  io.emit("documents" , changes)
  console.log("emitted")
} , 10000)
  


httpServer.listen(port, () => {
  console.log(` app listening on port ${port}`);
});


