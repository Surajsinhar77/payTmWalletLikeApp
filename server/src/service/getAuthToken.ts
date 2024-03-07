import jwt from "jsonwebtoken";
const secretKey : string = process.env.SecretKey ? process.env.SecretKey : "falseString717";

export function getAuthToken(id:number){
    try{
        return jwt.sign({userId: id}, secretKey);
    }catch(err){
        console.error("the console error is err: ", err);
        return false;
    }
}