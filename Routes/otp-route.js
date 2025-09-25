import sendOtp from "../services/otp-service.js";
import express from "express";

const otpRouter = express.Router();

otpRouter.post("/",sendOtp);

export default otpRouter;