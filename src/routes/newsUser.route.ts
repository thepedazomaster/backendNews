import { Router } from "express";
import verifyToken from "../middleware/auth";
import { createNewsUser, getNewsUser } from "../services/newsUser.service";

const router = Router();

router.get("/", verifyToken, getNewsUser);
router.post("/", verifyToken, createNewsUser);

export default router;
