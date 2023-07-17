import { Router } from "express";
import { verifyToken, emitToken} from "../middlewares/auth.middleware.js";
import controller from "../controllers/usuarios.controllers.js";
const router = Router();

//ruta post registro
router.post("/registro", controller.registro);
router.post("/login", emitToken, controller.login);

export default router;
