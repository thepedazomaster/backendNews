import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

dotenv.config();

export const getCountriesSearch: RequestHandler = async (req, res) => {
  try {
    const countries = await prisma.country.findMany();
    res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error inesperado" });
  }
};

export const getLenguageSearch: RequestHandler = async (req, res) => {
  try {
    const countries = await prisma.lenguage.findMany();
    res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error inesperado" }).status(500);
  }
};

export const getCategoriesSearch: RequestHandler = async (req, res) => {
  try {
    const countries = await prisma.categories_news.findMany();

    res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error inesperado" });
  }
};
