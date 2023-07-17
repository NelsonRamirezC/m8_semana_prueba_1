import Post from "../models/Post.models.js";
import Usuario from "../models/Usuario.models.js";
import Comentario from "../models/Comentario.models.js";
import moment from "moment";
moment.locale("es");

const home = async (req, res) => {
    let cantidadComentarios = await Post.count();
    let posts = await Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: Usuario,
                as: "autor",
                attributes: ["nombre", "apellido"],
            },
        ],
    });

    posts = posts.map(post => post.toJSON())
    posts = posts.map((post) => {
        post.createdAt = moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a");
        return post
    });

    res.render("home", {
        posts,
        cantidadComentarios,
    });
};

const login = (req, res) => {
    res.render("login");
};
const registro = (req, res) => {
    res.render("registro");
};

const posts = (req, res) => {
    res.render("posts");
};

const detallePosts = async (req, res) => {
    let id = req.params.id;
    try {
        let cantidadComentarios = await Comentario.count({
            where: {
                postId: id
            }
        })

        let post = await Post.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    as: "autor",
                    attributes: ["nombre", "apellido"],
                },
                {
                    model: Comentario,
                    as: "comentarios",
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: Usuario,
                            as: "autor",
                            attributes: ["nombre", "apellido"],
                        },
                    ],
                },
            ],
        });

        post = post.toJSON();
        post.createdAt = moment(post.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
        );

        console.log(post);
        res.render("detallePost", {
            post,
            cantidadComentarios,
        });
    } catch (error) {
        res.render("detallePost", {
            error: "Error al cargar el post con id: " + id,
        });
    }
};

const controladores = {
    home,
    login,
    registro,
    posts,
    detallePosts,
};

export default controladores;
