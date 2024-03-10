"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const db_1 = require("./dbconfig/db");
const user_auth_route_1 = __importDefault(require("./routes/user.auth.route"));
const account_router_1 = __importDefault(require("./routes/account.router"));
const cors_1 = __importDefault(require("cors"));
// custom middleware 
const authMiddleware_1 = require("./middleware/authMiddleware");
// database connectivity 
(0, db_1.connectToDatabase)(process.env.MongoDbUrl ? process.env.MongoDbUrl : "undefine data");
dotenv.config();
const app = (0, express_1.default)();
// global middelware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // body parser
app.use('/user/auth', user_auth_route_1.default);
app.use('/account', authMiddleware_1.authMiddleware, account_router_1.default);
app.listen(5000, () => {
    console.log("localhost 5000 is working ");
});
