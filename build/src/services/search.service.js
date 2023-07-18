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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSearch = exports.getSearchHistory = void 0;
const client_1 = require("@prisma/client");
const dotenv = __importStar(require("dotenv"));
const prisma = new client_1.PrismaClient();
dotenv.config();
const getSearchHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req;
        const user = customReq.user;
        const searches = yield prisma.search_news.findMany({
            include: { categories_news: true, lenguage: true, country: true },
            where: { user_id: user.id },
            orderBy: {},
        });
        res.json(searches).status(200);
    }
    catch (error) {
        res.status(500).json({ message: "error al traer las buquedas" });
    }
});
exports.getSearchHistory = getSearchHistory;
const createSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, to, from, country_code, lenguage_code, categories_news_id, type_search_id, } = req.body;
    const customReq = req;
    const user = customReq.user;
    try {
        yield prisma.search_news.create({
            data: {
                q,
                to,
                from,
                country_code,
                lenguage_code,
                categories_news_id,
                type_search_id,
                user_id: user.id,
            },
        });
        res.json({ message: "se guardo con exito" }).status(200);
    }
    catch (error) {
        res.status(500).json({ message: "no se guardo registro" });
    }
});
exports.createSearch = createSearch;
