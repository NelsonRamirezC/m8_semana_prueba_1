import Reaccion from "../models/Reaccion.models.js";

const darLike = async (req, res) => {
    try {
        let usuario = req.usuario.toJSON();
        let { id } = req.params;
        let message = "";

        const [reaccion, created] = await Reaccion.findOrCreate({
            where: { usuarioId: usuario.id, postId: id },
            defaults: {
                usuarioId: usuario.id,
                postId: id,
                like: true
            },
        });

        if (!created) {
            if (reaccion.like) {
                await reaccion.destroy();
                message = "Se eliminó su like.";
            } else {
                await reaccion.update({
                    like:true
                })
                message = "Se cambió su dislike por un like";
            }
        } else {
            message = "Se dió like a la publicación";
        }

        res.status(201).send({code: 201, message});
        
    } catch (error) {
        console.log("Lile error", error)
        res.status(500).json({ code: 500, message: "Error al dar like." });
    }
}

const darDisLike = async (req, res) => {
    try {
        let usuario = req.usuario;
        let { id } = req.params;
        let message = "";

        const [reaccion, created] = await Reaccion.findOrCreate({
            where: { usuarioId: usuario.id, postId: id },
            defaults: {
                usuarioId: usuario.id,
                postId: id,
                like: false,
            },
        });

        if (!created) {
            if (reaccion.like) {
                await reaccion.update({
                    like: false,
                });
                message = "Se cambió su like por un dislike";
            } else {
                await reaccion.destroy();
                message = "Se eliminó su dislike";
            }
        } else {
            message = "Se dió dislike a la publicación"
        }

        res.status(201).send({ code: 201, message});

    } catch (error) {
        console.log("Dislike error", error);
        res.status(500).json({ code: 500, message: "Error al dar disLike." });
    }
};


const controladores = {
    darLike,
    darDisLike,
};

export default controladores;