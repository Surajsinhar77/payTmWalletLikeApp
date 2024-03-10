"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountmodel = void 0;
var mongoose_1 = require("mongoose");
var accountScheme = new mongoose_1.default.Schema({
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
