import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import { findWorkers } from "../Controller/admin-controller.js";
const adminRouter = express.Router();

adminRouter.get("/worker",authMiddleware,findWorkers);

export default adminRouter;