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
exports.newsCategoryAi = void 0;
const openai_config_1 = __importDefault(require("./openai.config"));
const newsCategoryAi = ({ title, description = "", content = "", }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const userMessage = JSON.stringify({ title, description, content });
    const promp = `Instrucciones: Clasifica la siguiente noticia según los siguientes criterios: relevancia, tipo de fuente, tono, formato de entrega, lenguaje y sentimiento, segun el titulo, la descripcion, el contenido.
  Criterios de clasificación:
1. relevance: [Selecciona una opción y su id: {name:"alta", id:1}, {name:"media", id:2}, {name:"baja", id:3}]
2. font_type: [Selecciona una opción y su id: {name:"agencia de noticias",id:1},{ name:"medio tradicional", id:2}, {name:"blog", id:3}, {name:"red" social,id:4}]
3. tone_news: [Selecciona una opción y su id: {name:"objetivo", id:1},{name:"opinión", id:2}, {name:"sensacionalista", id:3}, {name:"satírico", id:4}, {name:"falso", id:5}]
4. format_news: [Selecciona una opción y su id: {name:"impreso", id:1}, {name:"online",id:2}, {name:"radio",id:3}, {name:"televisión",id:4}]
5. lenguage: [Selecciona una opción y su id: {name:"español",code:"es"}, {name:"inglés",code:"en"}, etc.]
6. feeling: [Selecciona una opción y su id: {name:"positivo",id:1}, {name:"negativo", id:2}, {name:"neutro", id:3}]
Ejemplo de entrada:
{"title":"mañana se va a acabar el mundo por comer aguacate", "description":"el mundo se va a acabar por que la RAE anuncio que hay escaces de aguacates", "content":"los aguacates son una de las fuentes de recursos mas importantes del mundo, sin ellos el ser humano no podria..."}
Ejemplo de respuesta (siempre envia las mismas keys y los values siempre el id o el code):
{"relevance":1,"font_type":1,"tone_news":5, "format_news";2, "lenguage":"es", "feeling":2  }
`;
    const resp = yield openai_config_1.default.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: promp },
            { role: "user", content: userMessage },
        ],
    });
    const newsAnalitic = (_c = JSON.parse((_b = (_a = resp.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : "")) !== null && _c !== void 0 ? _c : {};
    return newsAnalitic;
});
exports.newsCategoryAi = newsCategoryAi;
