import { login, register } from "../Controller/user-controller.js";
import express from "express";
import Upload from "../Config/multer.js";

const userRouter = express.Router();

userRouter.post("/register",Upload.single("image"),register);
userRouter.post('/login',login);


export default userRouter;