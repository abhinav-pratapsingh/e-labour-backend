//imports
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./Config/db.js";
import otpRouter from "./Routes/otp-route.js";
import userRouter from "./Routes/user-routes.js";
import addressRouter from "./Routes/address-route.js";

//.env loading
dotenv.config();

//PORT and Database
const Port = process.env.PORT || 3000;
const uri = process.env.URI;
dbConnect(uri);


// creating server
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//apis 
app.use("/api/otp",otpRouter);
app.use("/api/users",userRouter);
app.use("/api/addresses",addressRouter);

//starting server
app.listen(Port,()=>{
    console.log(`Listening on PORT no. ${Port}`);
})
