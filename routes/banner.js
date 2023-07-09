import express from "express";
import { getBanner,saveUpdateBanner } from "../controller/banner.js";
import { getAllSidebar,saveUpdateSideBar,deleteSidebar } from "../controller/sidebar.js";
import { getAllSubSidebar,saveUpdateSubSideBar,deleteSubSidebar } from "../controller/subsidebar.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.get('/getBanner', getBanner)
      .post('/saveBanner', upload.any(), saveUpdateBanner)
      
      // sidebar
      .get('/getAllSidebar', getAllSidebar)
      .post('/saveUpdateSideBar', saveUpdateSideBar)
      .get('/deleteSidebar', deleteSidebar)

      // sub-sidebar
      .get('/getAllSubSidebar', getAllSubSidebar)
      .post('/saveUpdateSubSideBar', saveUpdateSubSideBar)
      .get('/deleteSubSidebar', deleteSubSidebar)
      ;

export default router;