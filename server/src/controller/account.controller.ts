import { Request, Response } from "express";
import { accountmodel } from "../model/account.model";
import mongoose from "mongoose";

export async function getBalance(req:Request, res:Response){
    try{
        const userId = req.query.id;
        const amount = await accountmodel.findOne({userId: userId});
        return res.status(200).json({balance : amount?.balance});
    }catch(err){
        console.log("The errror is this : ", err);
        return res.json({message: err});
    }
}

export async function amountTransfer(req: Request, res: Response){
    const userId = req.query.id;
    try{
        const session = await mongoose.startSession();
        const amount : number  = req.body.amount;
        const to = new mongoose.Types.ObjectId(String(req.body.to));
        session.startTransaction(); // Start transaction

        const toUserAccount = await accountmodel.findOne({userId: to}).session(session);
        const fromUserAccount = await accountmodel.findOne({userId: userId}).session(session);

        if(!toUserAccount){
            await session.abortTransaction(); // rollback kind of stoping the transaction 
            return res.status(404).json({message : "The other user does't exist"});
        }

        if(Number(fromUserAccount?.balance) < amount){
            await session.abortTransaction(); // rollback kind of stoping the transaction 
            return res.status(404).json({message : "Insufficent balance"});
        }
        
        await accountmodel.updateOne(
            {userId: fromUserAccount?.userId}, // condition
            {
                $inc: { balance : -amount }
            }
        ).session(session);

        await accountmodel.updateOne(
            {userId: toUserAccount.userId},
            {
                $inc: { balance : amount }
            }
        ).session(session);
        
        await session.commitTransaction();
        const newUserUpdateddata = await accountmodel.findOne({ userId :fromUserAccount?.userId})
        return res.status(200).json({message: "Money is Successfull updated", leftBalance: newUserUpdateddata?.balance});
    }catch(err){
        console.log("this is the err message from money transfer ",err);
        return res.json({message : "The err is ", err});
    }
}