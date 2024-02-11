import express, {Request, Response, json} from "express";
import * as dotenv from 'dotenv';
import {connectToDatabase} from './dbconfig/db';
import userAuthRoute  from './routes/user.auth.route'; 
import userAccountRoute from './routes/account.router';
import cors from 'cors';


// database connectivity 
connectToDatabase(process.env.MongoDbUrl? process.env.MongoDbUrl : "undefine data"); 

dotenv.config();
const app = express();

// global middelware
app.use(express.json()); // body parser
app.use(cors());


app.use('/user/auth', userAuthRoute); 
app.use('/account', userAccountRoute);



app.listen(5000, ()=>{
    console.log("localhost 5000 is working ");
})