import openai from "./openai.config";

interface CategoryAiResponse {
  relevance: number;
  font_type: number;
  tone_news: number;
  format_news: number;
  lenguage: string;
  feeling: number;
}
interface PropsNewsCategoryAi {
  title: string;
  description?: string;
  content?: string;
}

export const newsCategoryAi = async ({
  title,
  description = "",
  content = "",
}: PropsNewsCategoryAi) => {
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
  const resp = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: promp },
      { role: "user", content: userMessage },
    ],
  });
  const newsAnalitic: CategoryAiResponse =
    JSON.parse(resp.data.choices[0].message?.content ?? "") ?? {};
  return newsAnalitic;
};
