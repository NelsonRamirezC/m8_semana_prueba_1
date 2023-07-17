import Comentario from "../models/Comentario.models.js";

const crearComentario = async (req, res) => {
    try {
        let usuario = req.usuario;
        let { contenido, postId } = req.body;
        console.log(req.body);
        
        await Comentario.create({
            contenido, postId, autorId : usuario.id
        })
        res.status(201).json({
            code: 201,
            message: "Comentario realizado con éxito.",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({code: 500, message: "Error al realizar el comentario."})
    }
};

const controladores = {
    crearComentario,
};

export default controladores;
