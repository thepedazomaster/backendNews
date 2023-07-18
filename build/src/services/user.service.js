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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.login = exports.registerUser = exports.getUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const prisma = new client_1.PrismaClient();
dotenv.config();
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: { user_news: true, person: true, search_news: true },
        });
        res.json(users).status(500);
    }
    catch (error) {
        res.status(500).json({ message: "Error procesando la solicitud" });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const numberId = parseInt(id !== null && id !== void 0 ? id : 0);
    try {
        const users = yield prisma.user.findUniqueOrThrow({
            where: { id: numberId },
            include: { user_news: true, person: true, search_news: true },
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: "El usuario no existe o esta repetido" });
    }
});
exports.getUser = getUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, lastname } = req.body;
    if (!email || !password || !name || !lastname) {
        res.status(400).json({ message: "falta informacion" });
    }
    try {
        const saltRounds = 10;
        const passHashed = bcrypt_1.default.hashSync(password, saltRounds);
        yield prisma.user.create({
            data: {
                email,
                password: passHashed,
                person: { create: { name, lastname } },
            },
        });
        res.status(200).json({ message: "Usuario creado con exito" });
    }
    catch (error) {
        res.status(500).json({ message: "No se creo el usuario" });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { email },
            include: { person: true },
        });
        if (user) {
            console.log(user);
            const verify = bcrypt_1.default.compareSync(password, user.password);
            if (verify) {
                const token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    email: user.email,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                }, (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : "");
                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    name: (_b = user.person) === null || _b === void 0 ? void 0 : _b.name,
                    lastname: (_c = user.person) === null || _c === void 0 ? void 0 : _c.lastname,
                    token,
                });
            }
            else {
                res
                    .status(401)
                    .json({ message: "Error en las credenciales" })
                    .status(401);
            }
        }
        else {
            res.status(401).json({ message: "Error en las credenciales" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en las credenciales" });
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, lastname } = req.body;
    const numberId = parseInt(id !== null && id !== void 0 ? id : 0);
    if (!name || !lastname) {
        res.status(400).json({ message: "falta informacion" });
    }
    try {
        yield prisma.user.update({
            where: { id: numberId },
            data: {
                person: { update: { name, lastname } },
            },
        });
        res.status(200).json({ message: "el usuario se actualizo" });
    }
    catch (error) {
        res.status(500).json({ message: "no se actualizo el usuario" });
    }
});
exports.updateUser = updateUser;
