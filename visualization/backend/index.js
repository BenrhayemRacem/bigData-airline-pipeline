const express = require("express");
const mongoose = require("mongoose");
const Delay = require("./models/delay.model");
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT;
const uri = process.env.DATABASE_URI2


const client = new MongoClient(uri);


console.log(process.env.DATABASE_URI , process.env.PORT)
app.get("/get", async (req, res) => {
  const result = await Delay.findOne();
  await new Delay({date:"123"}).save()

  res.send({ result });
});

mongoose
  .connect(process.env.DATABASE_URI ,{useNewUrlParser: true} )
  .then(() => {
    // console.log("database connected");
    // //Delay.watch().on('change' , data =>console.log(data))
    // const db = mongoose.connection ;
    // const delayCollection = db.collection('delay');
    // delayCollection.watch().on('change' , data =>console.log(data))
  })
  .catch((e) => {console.log(e)
    
  });
app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
async function run() {
  try {
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);