import jwt, { decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const secretKey = process.env.SecretKey? process.env.SecretKey :  "falseString717";

export async function authMiddleware(req:Request, res:Response, next:NextFunction){
    const jwttoken = req.headers.authorization;
    if(!jwttoken || !jwttoken.startsWith('Bearer ')){
        return res.status(403).json({message:"forbbiden"});//this should not comes in this line 
    }

    try{
        const token = jwttoken.split(' ')[1];
        jwt.verify(token, secretKey,(err,decord)=>{
                if(err){
                    return res.json({message :err});
                }
                const id = Object(decord); // have to convert this to object 
                req.query.id = id.userId;
            }
        ) 
        next();
    }catch(err){
        console.error("The Error on this page is : ", err);
        return res.status(403).json({message: err});
    }
}