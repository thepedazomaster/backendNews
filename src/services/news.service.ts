import { RequestHandler } from "express";
import { newsAPI } from "../lib/axios.config";
import { NewsResponse } from "../types";
import request from "axios";

export const getNewsHeadlines: RequestHandler = async (req, res) => {
  try {
    const { country, category, q, page, from, to } = req.query;

    const news = await newsAPI.get<NewsResponse>(`/top-headlines`, {
      params: { country, category, q, page, from, to, pageSize: 100 },
    });

    res.status(200).json(news.data);
  } catch (error: any) {
    if (request.isAxiosError(error) && error.response) {
      res.json(error.response.data).status(error.response.status);
    }
    res.status(500).json({ message: "error inesperado" });
  }
};

export const getNewsEverything: RequestHandler = async (req, res) => {
  try {
    const { q, language, sortBy, page } = req.query;

    const news = await newsAPI.get<NewsResponse>(`/Everything `, {
      params: { q, language, sortBy, page },
    });

    res.status(200).json(news.data);
  } catch (error: any) {
    if (request.isAxiosError(error) && error.response) {
      res.json(error.response.data).status(error.response.status);
    }
    res.status(500).json({ message: "error inesperado" });
  }
};
