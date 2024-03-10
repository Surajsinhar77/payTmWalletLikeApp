"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.updateUserInfo = exports.userLogin = exports.userRegister = void 0;
const user_model_1 = require("../model/user.model");
const account_model_1 = require("../model/account.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAuthToken_1 = require("../service/getAuthToken");
function userRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // geting number here 
            const username = req.body.username;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname; // this should throw error
            const password = req.body.password;
            const userExist = yield user_model_1.usermodel.findOne({ username: username });
            if (userExist) {
                return res.status(409).json({
                    message: "User already exists",
                    error: "Username or email address is already registered."
                });
            }
            // we have added this new thing to check how it is going to work here 
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hashpassword = yield bcrypt_1.default.hash(password, salt);
            // how the salt and saltRoundes work and why we need that 
            const userData = yield user_model_1.usermodel.create({
                username: username,
                firstname: firstname,
                lastname: lastname,
                password: hashpassword,
            });
            const accountData = yield account_model_1.accountmodel.create({
                userId: userData._id,
                balance: 1 + Math.random() * 1000
            });
            const token = (0, getAuthToken_1.getAuthToken)(userData._id);
            // await userData.save(); // we don't need to do this with model.create function 
            return res.status(200).json({ message: "Welcome, User is sucessfull created", user: userData, accessToken: token, accountData: accountData });
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.userRegister = userRegister;
function userLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const userExist = yield user_model_1.usermodel.findOne({ username: username }); // this should be await 
            if (!userExist) {
                return res.status(404).json({ message: "User does'nt Exist", error: "user not found" });
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, userExist.password);
            if (passwordMatch) {
                const userObjectId = new mongoose_1.default.Types.ObjectId(String(userExist.id));
                const userAccountData = yield account_model_1.accountmodel.findOne({ userId: userObjectId });
                const token = (0, getAuthToken_1.getAuthToken)(userExist._id);
                return res.status(200).json({ message: "User is sucessfull login", user: userExist, accessToken: token, accountData: userAccountData });
            }
            else {
                return res.status(403).json({ message: "Incorrect password", error: "Invalid cridential" });
            }
        }
        catch (err) {
            console.error("The error is Link this : ", err);
            return res.json({ message: err.message });
        }
    });
}
exports.userLogin = userLogin;
// To update password first we need to compare the old password if it is true then only u can update the password
function updateUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newFirstName = req.body.firstname;
            const newLastName = req.body.lastname;
            const oldPassword = req.body.oldpassword;
            const newPassword = req.body.password; // Need to work on this to update password 
            const userId = new mongoose_1.default.Types.ObjectId(String(req.query.id));
            const userExist = yield user_model_1.usermodel.findOne({ _id: userId });
            if (!userExist) {
                return res.json({ message: "User is not exist ", error: "You are not allow to update" });
            }
            let newPassForHash = newPassword ? newPassword : false;
            const updateData = {
                firstname: newFirstName ? newFirstName : userExist.firstname,
                lastname: newLastName ? newLastName : userExist.lastname,
            };
            let matchPassword = false;
            if (newPassForHash) {
                matchPassword = yield bcrypt_1.default.compare(oldPassword, userExist.password);
            }
            if (newPassForHash && matchPassword) {
                const hashpassword = yield bcrypt_1.default.hash(newPassForHash, 10);
                const newUpdateData = Object.assign(Object.assign({}, updateData), { password: hashpassword });
                const updateUser = yield user_model_1.usermodel.updateOne({ _id: userId }, newUpdateData);
                return res.status(200).json({ message: "Data is Update sucessfull", updateinfo: updateUser });
            }
            else {
                const updateUser = yield user_model_1.usermodel.updateOne({ _id: userId }, updateData);
                return res.status(200).json({ message: "Data is Update sucessfull", updateinfo: updateUser });
            }
        }
        catch (err) {
            return res.json({ message: err.message });
        }
    });
}
exports.updateUserInfo = updateUserInfo;
// just a get api to get all user data from the database 
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usersdata = yield user_model_1.usermodel.find({});
            return res.status(200).json({ message: "All user data", usersdata: usersdata });
        }
        catch (err) {
            return res.json({ message: err === null || err === void 0 ? void 0 : err.message });
        }
    });
}
exports.getAllUsers = getAllUsers;
