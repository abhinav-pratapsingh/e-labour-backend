import express from "express";
import { addAddress, deleteAddress, getAddress, updateAddress } from "../Controller/address-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const addressRouter = express.Router();

addressRouter.post('/',authMiddleware,addAddress);
addressRouter.get('/user/:userId',getAddress);
addressRouter.patch('/:addressId',updateAddress);
addressRouter.delete('/:addressId',deleteAddress);


export default addressRouter;