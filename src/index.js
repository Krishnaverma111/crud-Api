const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")
const route = require("./Route/Route")
dotenv.config()
const app = express()
app.use (express.json())
const port = 5000;

mongoose.connect(process.env.mongourl)
.then(()=>{console.log(`mongo db connected Sucessfully`);})
.catch((e)=>{console.log(`mongo db error${e}`);})

app.use("/",route)

app.listen(port,()=>{console.log(`this Server is running on this port =${port}`);})
