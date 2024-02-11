import mongoose, {connect} from "mongoose";

import * as dotenv from 'dotenv';
dotenv.config();

export async function connectToDatabase(url :string){
    try{
        await connect(url);
        console.log("Database is connected")
    }catch(err){
        console.log("The error is err : ", err);
    }
}