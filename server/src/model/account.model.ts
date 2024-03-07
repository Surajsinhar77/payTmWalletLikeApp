import mongoose, {Document} from "mongoose";
// import usermodel from './user.model';

interface account extends Document{
    balance : Number,
    userId : mongoose.Schema.Types.ObjectId,
}

const accountScheme = new mongoose.Schema({
    balance :{
        type: Number,
        required : true,
    },
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'usermodel',
        required : true,
    }
})

export const accountmodel = mongoose.model<account>('accounts', accountScheme);