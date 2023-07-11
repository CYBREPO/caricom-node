import express from "express";
import { getGridSix, saveUpdateGridSix, deleteGridSix } from "../controller/gridsix.js";
import { getAllCountries,createUpdateCountries,deleteCountries } from "../controller/countries.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.get('/getGridSix', getGridSix)
      .post('/saveUpdateGridSix', upload.single('gridSixImage'), saveUpdateGridSix)
      .get('/deleteGridSix', deleteGridSix)

      //countries
      .get('/getAllCountries', getAllCountries)
      .post('/createUpdateCountries', upload.single('countryFlag'), createUpdateCountries)
      .get('/deleteCountries', deleteCountries);

export default router;