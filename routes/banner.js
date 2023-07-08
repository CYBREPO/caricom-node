import express from "express";
import { saveBanner } from "../controller/banner.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.post('/saveBanner', upload.any(), saveBanner);

export default router;