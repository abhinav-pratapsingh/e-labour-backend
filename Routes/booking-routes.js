import express from "express";
import { addBooking, cancelBooking, showUpcomingBookings } from "../Controller/booking-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const bookingRouter = express.Router();

bookingRouter.get("/",authMiddleware,showUpcomingBookings);
bookingRouter.post("/new",authMiddleware,addBooking);
bookingRouter.patch("/:bookingId/cancel",cancelBooking);


export default bookingRouter;