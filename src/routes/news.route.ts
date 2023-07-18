import { Router } from "express";
import { getNewsEverything, getNewsHeadlines } from "../services/news.service";
import verifyToken from "../middleware/auth";

const router = Router();

router.get("/topHeadlines", verifyToken, getNewsHeadlines);
router.get("/everything", verifyToken, getNewsEverything);

export default router;
