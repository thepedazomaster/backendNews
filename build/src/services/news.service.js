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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsEverything = exports.getNewsHeadlines = void 0;
const axios_config_1 = require("../lib/axios.config");
const axios_1 = __importDefault(require("axios"));
const getNewsHeadlines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { country, category, q, page, from, to } = req.query;
        const news = yield axios_config_1.newsAPI.get(`/top-headlines`, {
            params: { country, category, q, page, from, to, pageSize: 100 },
        });
        res.status(200).json(news.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            res.json(error.response.data).status(error.response.status);
        }
        res.status(500).json({ message: "error inesperado" });
    }
});
exports.getNewsHeadlines = getNewsHeadlines;
const getNewsEverything = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q, language, sortBy, page } = req.query;
        const news = yield axios_config_1.newsAPI.get(`/Everything `, {
            params: { q, language, sortBy, page },
        });
        res.status(200).json(news.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            res.json(error.response.data).status(error.response.status);
        }
        res.status(500).json({ message: "error inesperado" });
    }
});
exports.getNewsEverything = getNewsEverything;
