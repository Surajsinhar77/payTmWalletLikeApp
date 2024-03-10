"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var account_controller_1 = require("../controller/account.controller");
var router = (0, express_1.Router)();
router.get('/balance', account_controller_1.getBalance);
router.post('/transfer', account_controller_1.amountTransfer);
exports.default = router;
