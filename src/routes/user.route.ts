import { Router } from "express";
import {
  getUser,
  getUsers,
  login,
  registerUser,
  updateUser,
} from "../services/user.service";

const router = Router();

router.post("/auth", login);
router.post("/register", registerUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);

export default router;
