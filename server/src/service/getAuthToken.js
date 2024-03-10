"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var secretKey = process.env.SecretKey ? process.env.SecretKey : "falseString717";
function getAuthToken(id) {
    try {
        return jsonwebtoken_1.default.sign({ userId: id }, secretKey);
    }
    catch (err) {
        console.error("the console error is err: ", err);
        return false;
    }
}
exports.getAuthToken = getAuthToken;
