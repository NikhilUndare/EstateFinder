import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

const app = express();
app.use(express.json());

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

app.get('/',(req,res)=>{
  res.send("Server is working")
})