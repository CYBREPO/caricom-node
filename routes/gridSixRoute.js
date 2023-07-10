import express from "express";
import { getGridSix, saveUpdateGridSix, deleteGridSix } from "../controller/gridsix.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.get('/getGridSix', getGridSix)
      .post('/saveUpdateGridSix', upload.single('gridSixImage'), saveUpdateGridSix)
      .get('/deleteGridSix', deleteGridSix)

export default router;