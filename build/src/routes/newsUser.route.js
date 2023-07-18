"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const newsUser_service_1 = require("../services/newsUser.service");
const router = (0, express_1.Router)();
router.get("/", auth_1.default, newsUser_service_1.getNewsUser);
router.post("/", auth_1.default, newsUser_service_1.createNewsUser);
exports.default = router;
