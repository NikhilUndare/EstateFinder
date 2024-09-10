import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

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