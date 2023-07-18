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
exports.getCategoriesSearch = exports.getLenguageSearch = exports.getCountriesSearch = void 0;
const client_1 = require("@prisma/client");
const dotenv = __importStar(require("dotenv"));
const prisma = new client_1.PrismaClient();
dotenv.config();
const getCountriesSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield prisma.country.findMany();
        res.status(200).json(countries);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "error inesperado" });
    }
});
exports.getCountriesSearch = getCountriesSearch;
const getLenguageSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield prisma.lenguage.findMany();
        res.status(200).json(countries);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "error inesperado" }).status(500);
    }
});
exports.getLenguageSearch = getLenguageSearch;
const getCategoriesSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield prisma.categories_news.findMany();
        res.status(200).json(countries);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "error inesperado" });
    }
});
exports.getCategoriesSearch = getCategoriesSearch;
