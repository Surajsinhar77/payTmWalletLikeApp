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
exports.amountTransfer = exports.getBalance = void 0;
var account_model_1 = require("../model/account.model");
var mongoose_1 = require("mongoose");
function getBalance(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, amount, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.query.id;
                    return [4 /*yield*/, account_model_1.accountmodel.findOne({ userId: userId })];
                case 1:
                    amount = _a.sent();
                    return [2 /*return*/, res.status(200).json({ balance: amount === null || amount === void 0 ? void 0 : amount.balance })];
                case 2:
                    err_1 = _a.sent();
                    console.log("The errror is this : ", err_1);
                    return [2 /*return*/, res.json({ message: err_1 })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBalance = getBalance;
function amountTransfer(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, session, amount, to, toUserAccount, fromUserAccount, newUserUpdateddata, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.query.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 13, , 14]);
                    return [4 /*yield*/, mongoose_1.default.startSession()];
                case 2:
                    session = _a.sent();
                    amount = req.body.amount;
                    to = new mongoose_1.default.Types.ObjectId(String(req.body.to));
                    session.startTransaction(); // Start transaction
                    return [4 /*yield*/, account_model_1.accountmodel.findOne({ userId: to }).session(session)];
                case 3:
                    toUserAccount = _a.sent();
                    return [4 /*yield*/, account_model_1.accountmodel.findOne({ userId: userId }).session(session)];
                case 4:
                    fromUserAccount = _a.sent();
                    if (!!toUserAccount) return [3 /*break*/, 6];
                    return [4 /*yield*/, session.abortTransaction()];
                case 5:
                    _a.sent(); // rollback kind of stoping the transaction 
                    return [2 /*return*/, res.status(404).json({ message: "The other user does't exist" })];
                case 6:
                    if (!(Number(fromUserAccount === null || fromUserAccount === void 0 ? void 0 : fromUserAccount.balance) < amount)) return [3 /*break*/, 8];
                    return [4 /*yield*/, session.abortTransaction()];
                case 7:
                    _a.sent(); // rollback kind of stoping the transaction 
                    return [2 /*return*/, res.status(404).json({ message: "Insufficent balance" })];
                case 8: return [4 /*yield*/, account_model_1.accountmodel.updateOne({ userId: fromUserAccount === null || fromUserAccount === void 0 ? void 0 : fromUserAccount.userId }, // condition
                    {
                        $inc: { balance: -amount }
                    }).session(session)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, account_model_1.accountmodel.updateOne({ userId: toUserAccount.userId }, {
                            $inc: { balance: amount }
                        }).session(session)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, account_model_1.accountmodel.findOne({ userId: fromUserAccount === null || fromUserAccount === void 0 ? void 0 : fromUserAccount.userId })];
                case 12:
                    newUserUpdateddata = _a.sent();
                    return [2 /*return*/, res.status(200).json({ message: "Money is Successfull updated", leftBalance: newUserUpdateddata === null || newUserUpdateddata === void 0 ? void 0 : newUserUpdateddata.balance })];
                case 13:
                    err_2 = _a.sent();
                    console.log("this is the err message from money transfer ", err_2);
                    return [2 /*return*/, res.json({ message: "The err is ", err: err_2 })];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.amountTransfer = amountTransfer;
