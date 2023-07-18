import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { NextFunction, Request, RequestHandler, Response } from "express";

dotenv.config();

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}

const verifyToken: RequestHandler = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY ?? "");
    (req as CustomRequest).user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
