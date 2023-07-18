import { PrismaClient, news, user } from "@prisma/client";
import * as dotenv from "dotenv";
import { RequestHandler } from "express";
import { CustomRequest } from "../middleware/auth";
import { newsCategoryAi } from "../lib/openai/openaiFuntions";

const prisma = new PrismaClient();

dotenv.config();

export const getNewsUser: RequestHandler = async (req, res) => {
  try {
    const customReq = req as CustomRequest;
    const user = customReq.user as user;

    const searches = await prisma.search_news.findMany({
      include: { categories_news: true, lenguage: true, country: true },
      where: { user_id: user.id },
    });
    res.status(200).json(searches);
  } catch (error) {
    res.status(500).json({ message: "error al traer las buquedas" });
  }
};

export const createNewsUser: RequestHandler = async (req, res) => {
  const { title, author, description, content, url, url_image, publishedAt } =
    req.body;
  const customReq = req as CustomRequest;
  const user = customReq.user as user;
  try {
    const newsInDb = await prisma.news.findUnique({
      where: { title_publishedAt: { title, publishedAt } },
    });
    if (newsInDb) {
      await prisma.user_news.create({
        data: {
          user_id: user.id,
          news_id: newsInDb.id,
        },
      });
      res.status(200).json({ message: "se guardo con exito" });
    }

    const { relevance, font_type, tone_news, format_news, lenguage, feeling } =
      await newsCategoryAi({
        title,
        description,
        content,
      });
    await prisma.news.create({
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
  } catch (error) {
    res.status(500).json({ message: " no se puedo almacenar la noticia" });
  }
};
