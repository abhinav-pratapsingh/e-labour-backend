import express from "express";
import { addAddress, deleteAddress, getAddress, updateAddress } from "../Controller/address-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const addressRouter = express.Router();

addressRouter.post('/',authMiddleware,addAddress);
addressRouter.get('/user',authMiddleware,getAddress);
addressRouter.patch('/:addressId',authMiddleware,updateAddress);
addressRouter.delete('/:addressId',authMiddleware,deleteAddress);


export default addressRouter;