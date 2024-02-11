import userModel from "../model/user.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { getAuthToken } from "../service/getAuthToken";

// model excution to get model 
const model = userModel();


export async function userRegister (req:Request, res: Response){
    try{
        console.log(typeof(req.body.lastname)); // geting number here 
        const username : string =  req.body.username;
        const firstname : string =  req.body.firstname;
        const lastname : string =  req.body.lastname; // this should throw error
        const password : string =  req.body.password;

        const userExist = await model.findOne({username : username});

        if(userExist){
            return res.status(409).json({
                message: "User already exists",
                error: "Username or email address is already registered." 
            })
        }

        // we have added this new thing to check how it is going to work here 
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashpassword = await bcrypt.hash(password, salt);
        // how the salt and saltRoundes work and why we need that 

        const userData = await model.create({
            username : username,
            firstname : firstname,
            lastname : lastname,
            password : hashpassword,
        })
        const token = getAuthToken(userData._id);
        // await userData.save(); // we don't need to do this with model.create function 
        return res.status(200).json({message : "user is sucessfull created", userData : userData, accessToken : token});
    }catch(err){
        console.error(err);
    }
}


export async function userLogin(req:Request, res:Response){
    try{
        const username : string =  req.body.username;
        const password : string =  req.body.password;

        const userExist = await model.findOne({username: username}); // this should be await 
        if(!userExist){
            return res.status(404).json({message :"User does'nt Exist", error: "user not found"});
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if(passwordMatch){
            const token = getAuthToken(userExist._id);
            return res.status(200).json({message:"User is sucessfull login", user : userExist , accessToken : token});
        }else{
            return res.status(403).json({message:"Incorrect password" ,error:"Invalid cridential"})
        }
    }catch(err:any){
        console.error("The error is Link this : ",err);
        return res.json({message: err.message});
    }
}


// To update password first we need to compare the old password if it is true then only u can update the password
export async function updateUserInfo(req:Request, res:Response){
    try{
        const newFirstName : string = req.body.firstname;
        const newLastName : string = req.body.lastname;
        const oldPassword : string = req.body.oldpassword;
        const newPassword  : string = req.body.password; // Need to work on this to update password 
        const userId = new mongoose.Types.ObjectId(String(req.query.id));

        const userExist = await model.findOne({_id: userId});
        if(!userExist){
            return res.json({message:"User is not exist ", error : "You are not allow to update"});
        }

        let newPassForHash = newPassword? newPassword : false; 

        const updateData = {
            firstname : newFirstName? newFirstName : userExist.firstname,
            lastname : newLastName? newLastName : userExist.lastname,
        }

        let matchPassword = false;
        if(newPassForHash){ 
            matchPassword = await bcrypt.compare(oldPassword, userExist.password);
        }

        if(newPassForHash && matchPassword){
            const hashpassword = await bcrypt.hash(newPassForHash, 10);
            const newUpdateData = {...updateData, password: hashpassword};
            const updateUser = await model.updateOne({_id : userId}, newUpdateData);
            return res.status(200).json({message:"Data is Update sucessfull", updateinfo: updateUser})
        }else{
            const updateUser = await model.updateOne({_id : userId}, updateData);
            return res.status(200).json({message:"Data is Update sucessfull", updateinfo: updateUser})
        }
        
    }catch(err:any){
        return res.json({message: err.message});
    }
}