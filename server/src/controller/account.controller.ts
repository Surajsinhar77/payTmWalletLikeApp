import { Request, Response } from "express";
import { accountmodel } from "../model/account.model";

export async function getBalance(req:Request, res:Response){
    try{
        const userId = req.query.id;
        console.log(userId);
        const amount = await accountmodel.findOne({userId: userId});

        return res.status(200).json({balance : amount?.balance});
    }catch(err){
        console.log("The errror is this : ", err);
        return res.json({message: err});
    }
}