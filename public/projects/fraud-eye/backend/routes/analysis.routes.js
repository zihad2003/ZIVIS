import { Router } from "express";
import { processCSVData } from "../controllers/analysis.controller.js";

const router = Router();

router.route("/analyze").post(processCSVData);

export default router;
