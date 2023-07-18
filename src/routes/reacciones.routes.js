import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import controller from "../controllers/reacciones.controllers.js";
const router = Router();

//ruta post dar like
router.post("/like/:id", verifyToken, controller.darLike);

//ruta post dar dislike
router.post("/dislike/:id", verifyToken, controller.darDisLike);

export default router;
