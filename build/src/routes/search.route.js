"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const search_service_1 = require("../services/search.service");
const router = (0, express_1.Router)();
router.get("/searchHistory", auth_1.default, search_service_1.getSearchHistory);
router.post("/", auth_1.default, search_service_1.createSearch);
exports.default = router;
