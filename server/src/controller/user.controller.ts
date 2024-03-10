import {usermodel} from "../model/user.model";
import  {accountmodel}  from "../model/account.model";
import { Request, Response, response } from "express";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { getAuthToken } from "../service/getAuthToken";
import { Types } from 'mongoose';


export async function userRegister (req:Request, res: Response){
    try{
        // geting number here 
        const username : string =  req.body.username;
        const firstname : string =  req.body.firstname;
        const lastname : string =  req.body.lastname; // this should throw error
        const password : string =  req.body.password;

        const userExist = await usermodel.findOne({username : username});

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

        

        const userData = await usermodel.create({
            username : username,
            firstname : firstname,
            lastname : lastname,
            password : hashpassword,
        })

        const accountData = await accountmodel.create({
            userId : userData._id,
            balance : 1+Math.random()*1000
        })
        
        
        const token = getAuthToken(userData._id);
        // await userData.save(); // we don't need to do this with model.create function 
        return res.status(200).json({message : "Welcome, User is sucessfull created", user : userData, accessToken : token, accountData : accountData});
    }catch(err){
        console.error(err);
    }
}


export async function userLogin(req:Request, res:Response){
    try{
        const username : string =  req.body.username;
        const password : string =  req.body.password;
        console.log("username and password from the login user backend ",username, password)
        const userExist = await usermodel.findOne({username: username}); // this should be await 
        if(!userExist){
            return res.status(404).json({message :"User does'nt Exist", error: "user not found"});
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if(passwordMatch){
            const userObjectId = new mongoose.Types.ObjectId(String(userExist.id));
            const userAccountData = await accountmodel.findOne({userId: userObjectId});
            const token = getAuthToken(userExist._id);
            return res.status(200).json({message:"User is sucessfull login", user : userExist , accessToken : token, accountData : userAccountData});
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

        const userExist = await usermodel.findOne({_id: userId});
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
            const updateUser = await usermodel.updateOne({_id : userId}, newUpdateData);
            return res.status(200).json({message:"Data is Update sucessfull", updateinfo: updateUser})
        }else{
            const updateUser = await usermodel.updateOne({_id : userId}, updateData);
            return res.status(200).json({message:"Data is Update sucessfull", updateinfo: updateUser})
        }
        
    }catch(err:any){
        return res.json({message: err.message});
    }
}

// just a get api to get all user data from the database 
export async function getAllUsers(req:Request, res:Response){
    try{
        const usersdata = await usermodel.find({});
        return res.status(200).json({message: "All user data", usersdata : usersdata});
    }catch(err){
        return res.json({message: (err as Error)?.message});
    }
}