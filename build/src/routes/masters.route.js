"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const masters_service_1 = require("../services/masters.service");
const router = (0, express_1.Router)();
router.get("/categoriesSearch", masters_service_1.getCategoriesSearch);
router.get("/countriesSearch", masters_service_1.getCountriesSearch);
router.get("/lenguageSearch", masters_service_1.getLenguageSearch);
exports.default = router;
