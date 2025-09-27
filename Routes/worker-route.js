import express from "express";
import { workerAddInfo } from "../Controller/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const workerRouter = express.Router();

workerRouter.post('/worker/info',authMiddleware,workerAddInfo);

export default workerRouter;