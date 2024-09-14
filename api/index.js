import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL)
 .then((response) => {
   console.log("connected to mongod DB successfully!");
 })
 .catch((err) => {
  console.log("connection to DB failed", err);
 });

app.listen( 3000, ()=>{
  console.log("Server is running on Port 3000 ...")
})

app.use('/api/user',UserRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);

app.get('/',(req,res)=>{
  res.send("Server is working")
})

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500 ;
  const message = err.message || "Internal Server error";
  return res.status(statusCode).json({
    success : false,
    statusCode,
    message
  })
})