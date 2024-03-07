import mongoose, {Document} from "mongoose";

const userScheme = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        lowercase : true,
        required: true,
    },

    firstname : {
        type : String,
        required : true,
    },

    lastname : {
        type : String, 
        required : true,
    },
    
    password : {
        type : String,
        required : true,
    },

    // accountId : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref : "accountmodel",
    //     required : true,
    // }
})

interface users extends Document{
    username : string,
    firstname : string,
    lastname : string,
    password : string,
    // accountId : mongoose.Schema.Types.ObjectId
}


    // here we are not use new for mongoose.model 
export const usermodel = mongoose.model<users>('users', userScheme);
