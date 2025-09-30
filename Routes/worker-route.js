import express from "express";
import { getWorkerInfo, listWorker, workerAddInfo } from "../Controller/worker-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const workerRouter = express.Router();

workerRouter.get("/",listWorker);
workerRouter.post('/worker/info',authMiddleware,workerAddInfo);
workerRouter.get("/mydetails",authMiddleware,getWorkerInfo);


export default workerRouter;