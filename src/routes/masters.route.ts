import { Router } from "express";
import {
  getCategoriesSearch,
  getCountriesSearch,
  getLenguageSearch,
} from "../services/masters.service";

const router = Router();

router.get("/categoriesSearch", getCategoriesSearch);
router.get("/countriesSearch", getCountriesSearch);
router.get("/lenguageSearch", getLenguageSearch);

export default router;
