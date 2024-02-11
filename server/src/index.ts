import express, {Request, Response, json} from "express";
import * as dotenv from 'dotenv';
import {connectToDatabase} from './dbconfig/db';
import userAuthRoute  from './routes/user.auth.route'; 
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json()); // body parser

// database connectivity 
connectToDatabase(process.env.MongoDbUrl? process.env.MongoDbUrl : "undefine data"); 
app.use('/auth',userAuthRoute); 
app.use(cors());

// app.get('/', (req:Request, res:Response)=>{
//     res.send("hello world");
// })

app.listen(5000, ()=>{
    console.log("localhost 5000 is working ");
})