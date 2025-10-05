import express from "express";
import { fetchworkerProfile, getWorkerInfo, listWorkers, workerAddInfo, workerInfoPrimary } from "../Controller/worker-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const workerRouter = express.Router();

workerRouter.get("/",listWorkers);
workerRouter.get("/worker/primary-info",authMiddleware,workerInfoPrimary);
workerRouter.post('/worker/info',authMiddleware,workerAddInfo);
workerRouter.get("/mydetails",authMiddleware,getWorkerInfo);
workerRouter.get("/:workerId",fetchworkerProfile);
export default workerRouter;