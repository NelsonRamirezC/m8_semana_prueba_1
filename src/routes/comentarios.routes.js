import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import controller from "../controllers/comentarios.controllers.js";
const router = Router();

//ruta post creacion posts
router.post("/", verifyToken, controller.crearComentario);

export default router;
