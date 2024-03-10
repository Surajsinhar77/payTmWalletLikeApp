"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv = require("dotenv");
var db_1 = require("./dbconfig/db");
var user_auth_route_1 = require("./routes/user.auth.route");
var account_router_1 = require("./routes/account.router");
var cors_1 = require("cors");
// custom middleware 
var authMiddleware_1 = require("./middleware/authMiddleware");
// database connectivity 
(0, db_1.connectToDatabase)(process.env.MongoDbUrl ? process.env.MongoDbUrl : "undefine data");
dotenv.config();
var app = (0, express_1.default)();
// global middelware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // body parser
app.use('/user/auth', user_auth_route_1.default);
app.use('/account', authMiddleware_1.authMiddleware, account_router_1.default);
app.listen(5000, function () {
    console.log("localhost 5000 is working ");
});
