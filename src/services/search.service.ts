import { PrismaClient, search_news, user } from "@prisma/client";
import * as dotenv from "dotenv";
import { RequestHandler } from "express";
import { CustomRequest } from "../middleware/auth";

const prisma = new PrismaClient();

dotenv.config();

export const getSearchHistory: RequestHandler = async (req, res) => {
  try {
    const customReq = req as CustomRequest;
    const user = customReq.user as user;

    const searches = await prisma.search_news.findMany({
      include: { categories_news: true, lenguage: true, country: true },
      where: { user_id: user.id },
      orderBy: {},
    });
    res.json(searches).status(200);
  } catch (error) {
    res.status(500).json({ message: "error al traer las buquedas" });
  }
};
export const createSearch: RequestHandler = async (req, res) => {
  const {
    q,
    to,
    from,
    country_code,
    lenguage_code,
    categories_news_id,
    type_search_id,
  } = req.body as search_news;
  const customReq = req as CustomRequest;
  const user = customReq.user as user;
  try {
    await prisma.search_news.create({
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
  } catch (error) {
    res.status(500).json({ message: "no se guardo registro" });
  }
};
