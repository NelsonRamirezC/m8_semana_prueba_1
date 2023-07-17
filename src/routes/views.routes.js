import { Router } from "express";
//import { verifyToken, validarAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

//ruta post usuarios
router.get(["/home", "/"], (req, res) => {
    res.render("home");
});


export default router;
