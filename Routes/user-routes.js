import { login, register,getCusProfile } from "../Controller/user-controller.js";
import express from "express";
import Upload from "../Config/multer.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const userRouter = express.Router();

userRouter.post("/register",Upload.single("image"),register);
userRouter.post('/login',login);
userRouter.get("/mydetails",authMiddleware,getCusProfile);

export default userRouter;