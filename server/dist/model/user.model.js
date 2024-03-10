"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userScheme = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // accountId : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref : "accountmodel",
    //     required : true,
    // }
});
// here we are not use new for mongoose.model 
exports.usermodel = mongoose_1.default.model('users', userScheme);