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
exports.amountTransfer = exports.getBalance = void 0;
const account_model_1 = require("../model/account.model");
const mongoose_1 = __importDefault(require("mongoose"));
function getBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.query.id;
            const amount = yield account_model_1.accountmodel.findOne({ userId: userId });
            return res.status(200).json({ balance: amount === null || amount === void 0 ? void 0 : amount.balance });
        }
        catch (err) {
            console.log("The errror is this : ", err);
            return res.json({ message: err });
        }
    });
}
exports.getBalance = getBalance;
function amountTransfer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.query.id;
        try {
            const session = yield mongoose_1.default.startSession();
            const amount = req.body.amount;
            const to = new mongoose_1.default.Types.ObjectId(String(req.body.to));
            session.startTransaction(); // Start transaction
            const toUserAccount = yield account_model_1.accountmodel.findOne({ userId: to }).session(session);
            const fromUserAccount = yield account_model_1.accountmodel.findOne({ userId: userId }).session(session);
            if (!toUserAccount) {
                yield session.abortTransaction(); // rollback kind of stoping the transaction 
                return res.status(404).json({ message: "The other user does't exist" });
            }
            if (Number(fromUserAccount === null || fromUserAccount === void 0 ? void 0 : fromUserAccount.balance) < amount) {
                yield session.abortTransaction(); // rollback kind of stoping the transaction 
                return res.status(404).json({ message: "Insufficent balance" });
            }
            yield account_model_1.accountmodel.updateOne({ userId: fromUserAccount === null || fromUserAccount === void 0 ? void 0 : fromUserAccount.userId }, // condition
            {
                $inc: { balance: -amount }
            }).session(session);
            yield account_model_1.accountmodel.updateOne({ userId: toUserAccount.userId }, {
                $inc: { balance: amount }
            }).session(session);
            yield session.commitTransaction();
            const newUserUpdateddata = yield account_model_1.accountmodel.findOne({ userId: fromUserAccount === null || fromUserAccount === void 0 ? void 0 : fromUserAccount.userId });
            return res.status(200).json({ message: "Money is Successfull updated", leftBalance: newUserUpdateddata === null || newUserUpdateddata === void 0 ? void 0 : newUserUpdateddata.balance });
        }
        catch (err) {
            console.log("this is the err message from money transfer ", err);
            return res.json({ message: "The err is ", err });
        }
    });
}
exports.amountTransfer = amountTransfer;
