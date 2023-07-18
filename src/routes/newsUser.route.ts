import { Router } from "express";
import { getNewsEverything, getNewsHeadlines } from "../services/news.service";
import verifyToken from "../middleware/auth";

const router = Router();

router.get("/", verifyToken, getNewsHeadlines);
router.post("/", verifyToken, getNewsEverything);

export default router;
