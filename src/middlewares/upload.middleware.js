import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFiles = (req, res, next) => {
    try {
        let imagen = req.files.imagen;
        let formatosPermitidos = ["jpeg", "png", "webp", "gif", "svg"];
        let extension = `${imagen.mimetype.split("/")[1]}`;
        let limiteMb = 2;
        let limitePesoFoto = limiteMb * 1024 * 1024;

        //LIMITE TAMAÑO DE ARCHIVOS.
        if (imagen.size > limitePesoFoto) {
            return res.status(400).json({
                code: 400,
                message: `Ha sobrepasado el limite permitido [${limiteMb} mb]`,
            });
        }

            if (!formatosPermitidos.includes(extension)) {
                return res.status(400).json({
                    code: 400,
                    message: `Formato no permitido ${extension}, formatos permitidos(${formatosPermitidos.join(
                        " - "
                    )})`,
                });
            }
        let nombreFoto = `${Date.now()}-img.${extension}`;
        let pathDestino = path.resolve(__dirname, "../../public/uploads/" + nombreFoto);


        imagen.mv(pathDestino, async (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    code: 500,
                    message:
                        "Error al subir la imagen en proceso de creación de producto.",
                });
            }

            req.nombreImagen = nombreFoto;
            req.pathImagen = pathDestino;
            next();
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ code: 500, message: "Error al procesar solicitud." });
    }
};

export default uploadFiles;
