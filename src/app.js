import express from "express";
import upload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import { create } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//importaciones de rutas
import viewsRoutes from "./routes/views.routes.js";

const app = express();

//configuración handlebars

const hbs = create({
    partialsDir: [path.resolve(__dirname, "./views/partials")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//middlewares generales

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());

//publicacion de carpetas
app.use("/public", express.static(path.resolve(__dirname, "../public")));

//rutas de endpoints

//rutas de vista
app.use("/", viewsRoutes);

export default app;
