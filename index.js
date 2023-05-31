const express=require("express");
const cors=require("cors")
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoute");
const { router } = require("./routes/search");
require("dotenv").config();

const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome")
})


app.use("/user",userRoute)

app.use("/weather",router)



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`Server is running at port ${process.env.port}`)
        console.log("Successfully connected to DB");
    } catch (error) {
        console.log("Error connecting to DB");
        console.log(error);
    }
})