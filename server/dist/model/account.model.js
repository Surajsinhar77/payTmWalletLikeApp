"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountmodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const accountScheme = new mongoose_1.default.Schema({
    balance: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'usermodel',
        required: true,
    }
});
exports.accountmodel = mongoose_1.default.model('accounts', accountScheme);
