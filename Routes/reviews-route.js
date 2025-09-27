import express from "express";
import { addReview, delReview, getReview, updateReview } from "../Controller/reviews-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const reviewsRouter = express.Router();

reviewsRouter.post('/:workerId',authMiddleware,addReview);
reviewsRouter.get('/:workerId',authMiddleware,getReview);
reviewsRouter.patch('/:reviewId',authMiddleware,updateReview);
reviewsRouter.delete('/:reviewId',authMiddleware,delReview);

export default reviewsRouter;