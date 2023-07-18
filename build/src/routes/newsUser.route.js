"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_service_1 = require("../services/news.service");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/", auth_1.default, news_service_1.getNewsHeadlines);
router.post("/", auth_1.default, news_service_1.getNewsEverything);
exports.default = router;
