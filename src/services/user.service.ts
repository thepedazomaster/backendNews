import { PrismaClient, user } from "@prisma/client";
import { RequestHandler } from "express";
import { accountRequest } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config();

export const getUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { user_news: true, person: true, search_news: true },
    });
    res.json(users).status(500);
  } catch (error) {
    res.status(500).json({ message: "Error procesando la solicitud" });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params as { id: string };
  const numberId = parseInt(id ?? 0);
  try {
    const users = await prisma.user.findUniqueOrThrow({
      where: { id: numberId },
      include: { user_news: true, person: true, search_news: true },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "El usuario no existe o esta repetido" });
  }
};

export const registerUser: RequestHandler = async (req, res) => {
  const { email, password, name, lastname } = req.body as accountRequest;

  if (!email || !password || !name || !lastname) {
    res.status(400).json({ message: "falta informacion" });
  }

  try {
    const saltRounds = 10;

    const passHashed = bcrypt.hashSync(password, saltRounds);
    await prisma.user.create({
      data: {
        email,
        password: passHashed,
        person: { create: { name, lastname } },
      },
    });
    res.status(200).json({ message: "Usuario creado con exito" });
  } catch (error) {
    res.status(500).json({ message: "No se creo el usuario" });
  }
};
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as user;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { person: true },
    });
    if (user) {
      console.log(user);

      const verify = bcrypt.compareSync(password, user.password);
      if (verify) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          },
          process.env.SECRET_KEY ?? ""
        );
        res.status(200).json({
          id: user.id,
          email: user.email,
          name: user.person?.name,
          lastname: user.person?.lastname,
          token,
        });
      } else {
        res
          .status(401)
          .json({ message: "Error en las credenciales" })
          .status(401);
      }
    } else {
      res.status(401).json({ message: "Error en las credenciales" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error en las credenciales" });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params as { id: string };
  const { name, lastname } = req.body;
  const numberId = parseInt(id ?? 0);

  if (!name || !lastname) {
    res.status(400).json({ message: "falta informacion" });
  }

  try {
    await prisma.user.update({
      where: { id: numberId },
      data: {
        person: { update: { name, lastname } },
      },
    });
    res.status(200).json({ message: "el usuario se actualizo" });
  } catch (error) {
    res.status(500).json({ message: "no se actualizo el usuario" });
  }
};
