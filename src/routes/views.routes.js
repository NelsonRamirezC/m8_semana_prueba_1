import { Router } from "express";
//import { verifyToken, validarAdmin } from "../middlewares/auth.middleware.js";
import controller from "../controllers/views.controllers.js";
const router = Router();

//ruta vistas
router.get(["/home", "/"], controller.home);

router.get("/login", controller.login);

router.get("/registro", controller.registro);

router.get("/posts", controller.posts);


export default router;
