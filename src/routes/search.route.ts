import { Router } from "express";
import verifyToken from "../middleware/auth";
import { createSearch, getSearchHistory } from "../services/search.service";

const router = Router();

router.get("/searchHistory", verifyToken, getSearchHistory);
router.post("/", verifyToken, createSearch);

export default router;
