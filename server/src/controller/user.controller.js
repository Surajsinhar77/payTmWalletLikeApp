"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.updateUserInfo = exports.userLogin = exports.userRegister = void 0;
var user_model_1 = require("../model/user.model");
var account_model_1 = require("../model/account.model");
var bcrypt_1 = require("bcrypt");
var mongoose_1 = require("mongoose");
var getAuthToken_1 = require("../service/getAuthToken");
function userRegister(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, firstname, lastname, password, userExist, saltRounds, salt, hashpassword, userData, accountData, token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    username = req.body.username;
                    firstname = req.body.firstname;
                    lastname = req.body.lastname;
                    password = req.body.password;
                    return [4 /*yield*/, user_model_1.usermodel.findOne({ username: username })];
                case 1:
                    userExist = _a.sent();
                    if (userExist) {
                        return [2 /*return*/, res.status(409).json({
                                message: "User already exists",
                                error: "Username or email address is already registered."
                            })];
                    }
                    saltRounds = 10;
                    return [4 /*yield*/, bcrypt_1.default.genSalt(saltRounds)];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 3:
                    hashpassword = _a.sent();
                    return [4 /*yield*/, user_model_1.usermodel.create({
                            username: username,
                            firstname: firstname,
                            lastname: lastname,
                            password: hashpassword,
                        })];
                case 4:
                    userData = _a.sent();
                    return [4 /*yield*/, account_model_1.accountmodel.create({
                            userId: userData._id,
                            balance: 1 + Math.random() * 1000
                        })];
                case 5:
                    accountData = _a.sent();
                    token = (0, getAuthToken_1.getAuthToken)(userData._id);
                    // await userData.save(); // we don't need to do this with model.create function 
                    return [2 /*return*/, res.status(200).json({ message: "Welcome, User is sucessfull created", user: userData, accessToken: token, accountData: accountData })];
                case 6:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.userRegister = userRegister;
function userLogin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, userExist, passwordMatch, userObjectId, userAccountData, token, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    username = req.body.username;
                    password = req.body.password;
                    return [4 /*yield*/, user_model_1.usermodel.findOne({ username: username })];
                case 1:
                    userExist = _a.sent();
                    if (!userExist) {
                        return [2 /*return*/, res.status(404).json({ message: "User does'nt Exist", error: "user not found" })];
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, userExist.password)];
                case 2:
                    passwordMatch = _a.sent();
                    if (!passwordMatch) return [3 /*break*/, 4];
                    userObjectId = new mongoose_1.default.Types.ObjectId(String(userExist.id));
                    return [4 /*yield*/, account_model_1.accountmodel.findOne({ userId: userObjectId })];
                case 3:
                    userAccountData = _a.sent();
                    token = (0, getAuthToken_1.getAuthToken)(userExist._id);
                    return [2 /*return*/, res.status(200).json({ message: "User is sucessfull login", user: userExist, accessToken: token, accountData: userAccountData })];
                case 4: return [2 /*return*/, res.status(403).json({ message: "Incorrect password", error: "Invalid cridential" })];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_2 = _a.sent();
                    console.error("The error is Link this : ", err_2);
                    return [2 /*return*/, res.json({ message: err_2.message })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.userLogin = userLogin;
// To update password first we need to compare the old password if it is true then only u can update the password
function updateUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newFirstName, newLastName, oldPassword, newPassword, userId, userExist, newPassForHash, updateData, matchPassword, hashpassword, newUpdateData, updateUser, updateUser, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    newFirstName = req.body.firstname;
                    newLastName = req.body.lastname;
                    oldPassword = req.body.oldpassword;
                    newPassword = req.body.password;
                    userId = new mongoose_1.default.Types.ObjectId(String(req.query.id));
                    return [4 /*yield*/, user_model_1.usermodel.findOne({ _id: userId })];
                case 1:
                    userExist = _a.sent();
                    if (!userExist) {
                        return [2 /*return*/, res.json({ message: "User is not exist ", error: "You are not allow to update" })];
                    }
                    newPassForHash = newPassword ? newPassword : false;
                    updateData = {
                        firstname: newFirstName ? newFirstName : userExist.firstname,
                        lastname: newLastName ? newLastName : userExist.lastname,
                    };
                    matchPassword = false;
                    if (!newPassForHash) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.compare(oldPassword, userExist.password)];
                case 2:
                    matchPassword = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!(newPassForHash && matchPassword)) return [3 /*break*/, 6];
                    return [4 /*yield*/, bcrypt_1.default.hash(newPassForHash, 10)];
                case 4:
                    hashpassword = _a.sent();
                    newUpdateData = __assign(__assign({}, updateData), { password: hashpassword });
                    return [4 /*yield*/, user_model_1.usermodel.updateOne({ _id: userId }, newUpdateData)];
                case 5:
                    updateUser = _a.sent();
                    return [2 /*return*/, res.status(200).json({ message: "Data is Update sucessfull", updateinfo: updateUser })];
                case 6: return [4 /*yield*/, user_model_1.usermodel.updateOne({ _id: userId }, updateData)];
                case 7:
                    updateUser = _a.sent();
                    return [2 /*return*/, res.status(200).json({ message: "Data is Update sucessfull", updateinfo: updateUser })];
                case 8: return [3 /*break*/, 10];
                case 9:
                    err_3 = _a.sent();
                    return [2 /*return*/, res.json({ message: err_3.message })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserInfo = updateUserInfo;
// just a get api to get all user data from the database 
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersdata, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1.usermodel.find({})];
                case 1:
                    usersdata = _a.sent();
                    return [2 /*return*/, res.status(200).json({ message: "All user data", usersdata: usersdata })];
                case 2:
                    err_4 = _a.sent();
                    return [2 /*return*/, res.json({ message: err_4 === null || err_4 === void 0 ? void 0 : err_4.message })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
