// imports
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./Config/db.js";
import otpRouter from "./Routes/otp-route.js";
import userRouter from "./Routes/user-routes.js";
import addressRouter from "./Routes/address-route.js";
import cors from "cors";
import reviewsRouter from "./Routes/reviews-route.js";
import workerRouter from "./Routes/worker-route.js";
import bookingRouter from "./Routes/booking-routes.js";

// .env loading
dotenv.config();

// PORT and Database
const Port = process.env.PORT || 3000;
const uri = process.env.URI;
dbConnect(uri);

// creating server
const app = express();

// Allowed origins
const allowedOrigins = [
  "https://e-majdur.netlify.app",
  "http://localhost:5173"         
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs
app.use("/api/otp", otpRouter);
app.use("/api/users", userRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/workers", workerRouter);
app.use("/api/bookings", bookingRouter);

// Starting server
app.listen(Port, () => {
  console.log(`Listening on PORT no. ${Port}`);
});
