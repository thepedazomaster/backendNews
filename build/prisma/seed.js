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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //create user
        const saltRounds = 10;
        const passHashed = bcrypt_1.default.hashSync("myPassword_", saltRounds);
        const bryan = yield prisma.user.upsert({
            where: { email: "bryanTest@gmail.com".toLowerCase() },
            update: {},
            create: {
                email: "bryanTest@gmail.com".toLowerCase(),
                password: passHashed,
                person: { create: { name: "bryan", lastname: "Hernandez" } },
            },
        });
        //create Categories
        const categories = [
            "business",
            "entertainment",
            "general",
            "health",
            "sciences",
            "sports",
            "technology",
        ];
        categories.forEach((category) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.categories_news.upsert({
                where: { name: category },
                update: {},
                create: { name: category },
            });
        }));
        //create lenguaje
        const countries = [
            { code: "ae", name: "United Arab Emirates" },
            { code: "ar", name: "Argentina" },
            { code: "at", name: "Austria" },
            { code: "au", name: "Australia" },
            { code: "be", name: "Belgium" },
            { code: "bg", name: "Bulgaria" },
            { code: "br", name: "Brazil" },
            { code: "ca", name: "Canada" },
            { code: "ch", name: "Switzerland" },
            { code: "cn", name: "China" },
            { code: "co", name: "Colombia" },
            { code: "cu", name: "Cuba" },
            { code: "cz", name: "Czech Republic" },
            { code: "de", name: "Germany" },
            { code: "eg", name: "Egypt" },
            { code: "fr", name: "France" },
            { code: "gb", name: "United Kingdom" },
            { code: "gr", name: "Greece" },
            { code: "hk", name: "Hong Kong" },
            { code: "hu", name: "Hungary" },
            { code: "id", name: "Indonesia" },
            { code: "ie", name: "Ireland" },
            { code: "il", name: "Israel" },
            { code: "in", name: "India" },
            { code: "it", name: "Italy" },
            { code: "jp", name: "Japan" },
            { code: "kr", name: "South Korea" },
            { code: "lt", name: "Lithuania" },
            { code: "lv", name: "Latvia" },
            { code: "ma", name: "Morocco" },
            { code: "mx", name: "Mexico" },
            { code: "my", name: "Malaysia" },
            { code: "ng", name: "Nigeria" },
            { code: "nl", name: "Netherlands" },
            { code: "no", name: "Norway" },
            { code: "nz", name: "New Zealand" },
            { code: "ph", name: "Philippines" },
            { code: "pl", name: "Poland" },
            { code: "pt", name: "Portugal" },
            { code: "ro", name: "Romania" },
            { code: "rs", name: "Serbia" },
            { code: "ru", name: "Russia" },
            { code: "sa", name: "Saudi Arabia" },
            { code: "se", name: "Sweden" },
            { code: "sg", name: "Singapore" },
            { code: "si", name: "Slovenia" },
            { code: "sk", name: "Slovakia" },
            { code: "th", name: "Thailand" },
            { code: "tr", name: "Turkey" },
            { code: "tw", name: "Taiwan" },
            { code: "ua", name: "Ukraine" },
            { code: "us", name: "United States" },
            { code: "ve", name: "Venezuela" },
            { code: "za", name: "South Africa" },
        ];
        countries.forEach((country) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.country.upsert({
                where: { code: country.code },
                update: {},
                create: { code: country.code, name: country.name },
            });
        }));
        //create country
        const lenguages = [
            { code: "ar", name: "Árabe" },
            { code: "de", name: "Alemán" },
            { code: "es", name: "Español" },
            { code: "fr", name: "Francés" },
            { code: "he", name: "Hebreo" },
            { code: "it", name: "Italiano" },
            { code: "nl", name: "Holandés" },
            { code: "no", name: "Noruego" },
            { code: "pt", name: "Portugués" },
            { code: "ru", name: "Ruso" },
            { code: "sv", name: "Sueco" },
            { code: "ud", name: "Indefinido" },
            { code: "zh", name: "Chino" },
        ];
        lenguages.forEach((lenguage) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.lenguage.upsert({
                where: { code: lenguage.code },
                update: {},
                create: { code: lenguage.code, name: lenguage.name },
            });
        }));
        //create search type
        const typeSearch = ["topHeadlines", "everything"];
        typeSearch.forEach((type) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.type_search.upsert({
                where: { name: type },
                update: {},
                create: { name: type },
            });
        }));
        console.log(bryan);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
