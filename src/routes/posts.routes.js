import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import controller from "../controllers/posts.controllers.js";
import upload from "../middlewares/upload.middleware.js";
const router = Router();

//ruta post creacion posts
router.post("/", verifyToken, upload, controller.crearPost);

export default router;
