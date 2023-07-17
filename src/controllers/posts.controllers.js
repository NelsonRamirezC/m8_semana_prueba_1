import Post from "../models/Post.models.js";
import fs from "fs";

const crearPost = async (req, res) => {
    try {
        let pathImagen = req.pathImagen; 
        let usuario = req.usuario;
        let { titulo, contenido } = req.body;
        console.log("body", req.body);
        
        let nuevoPost = await Post.create({
            titulo,
            contenido,
            imagen: pathImagen,
            autorId: usuario.id
        })

        res.status(201).send({code: 201, message: "Post creado con éxito."})

    } catch (error) {
        console.log(error);
        fs.unlinkSync(req.pathImagen);
        res.status(500).json({code: 500, message: "Error en creación de post."})
    }
}

const controladores = {
    crearPost
};

export default controladores;
