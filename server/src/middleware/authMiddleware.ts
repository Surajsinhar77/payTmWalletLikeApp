import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const secretKey = process.env.SecretKey? process.env.SecretKey :  "falseString717";

export async function authMiddleware(req:Request, res:Response, next:NextFunction){
    const jwttoken = req.headers.authorization;

    if(!jwttoken || !jwttoken.startsWith('Bearer ')){
        return res.status(403).json({message:"forbbiden"});
    }

    const token = jwttoken.split(' ')[1];
    try{
        const decorded = jwt.verify(token, secretKey); 
        console.log("this is the decord data here : ",decorded);
        req.query.id = decorded;
        next();

    }catch(err){
        console.error("The Error on this page is : ", err);
        return res.status(403).json({message: err});
    }
}