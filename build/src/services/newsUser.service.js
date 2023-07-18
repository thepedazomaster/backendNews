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
exports.createNewsUser = exports.getNewsUser = void 0;
const client_1 = require("@prisma/client");
const dotenv = __importStar(require("dotenv"));
const openaiFuntions_1 = require("../lib/openai/openaiFuntions");
const prisma = new client_1.PrismaClient();
dotenv.config();
const getNewsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req;
        const user = customReq.user;
        const searches = yield prisma.search_news.findMany({
            include: { categories_news: true, lenguage: true, country: true },
            where: { user_id: user.id },
        });
        res.status(200).json(searches);
    }
    catch (error) {
        res.status(500).json({ message: "error al traer las buquedas" });
    }
});
exports.getNewsUser = getNewsUser;
const createNewsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, description, content, url, url_image, publishedAt } = req.body;
    const customReq = req;
    const user = customReq.user;
    try {
        const newsInDb = yield prisma.news.findUnique({
            where: { title_publishedAt: { title, publishedAt } },
        });
        if (newsInDb) {
            yield prisma.user_news.create({
                data: {
                    user_id: user.id,
                    news_id: newsInDb.id,
                },
            });
            res.status(200).json({ message: "se guardo con exito" });
        }
        const { relevance, font_type, tone_news, format_news, lenguage, feeling } = yield (0, openaiFuntions_1.newsCategoryAi)({
            title,
            description,
            content,
        });
        yield prisma.news.create({
            data: {
                title,
                author,
                description,
                url,
                url_image,
                publishedAt,
                relevance_id: relevance,
                font_Type_id: font_type,
                tone_id: tone_news,
                format_id: format_news,
                lenguage,
                feeling_id: feeling,
                user_news: { create: { user_id: user.id } },
            },
        });
        res.status(200).json({ message: "se guardo con exito" });
    }
    catch (error) {
        res.status(500).json({ message: " no se puedo almacenar la noticia" });
    }
});
exports.createNewsUser = createNewsUser;
