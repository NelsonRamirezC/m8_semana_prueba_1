import Post from "../models/Post.models.js";
import Usuario from "../models/Usuario.models.js";
import Comentario from "../models/Comentario.models.js";
import Reaccion from "../models/Reaccion.models.js";
import moment from "moment";
import sequelize from "../database/database.js";
moment.locale("es");

const home = async (req, res) => {

    let [rows] = await sequelize.query(`
        select u."nombre", u."apellido", count(*) cantidad from "Usuarios" u
        INNER JOIN "Posts" p
        ON u."id" = p."autorId"
        group by u."nombre", u."apellido"
        having count(*)  > 0
        order by cantidad desc
        limit 5
    `);
    let topPosts = rows;
    let cantidadComentarios = await Post.count();
    let posts = await Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: Usuario,
                as: "autor",
                attributes: ["nombre", "apellido"],
            },
            {
                model: Reaccion,
                as: "reacciones",
                attributes: ["like", "usuarioId"],
            },
        ],
    });

    posts = posts.map(post => post.toJSON())
    posts = posts.map((post) => {
        post.createdAt = moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a");
        let likes = post.reacciones.filter(reaccion => reaccion.like);
        let dislikes = post.reacciones.filter(reaccion => !reaccion.like)
        post.likes = likes.length;
        post.dislikes = dislikes.length; 
        return post
    });
    console.log(posts);

    res.render("home", {
        posts,
        cantidadComentarios,
        topPosts,
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
                {
                    model: Reaccion,
                    as: "reacciones",
                    attributes: ["like", "usuarioId"],
                },
            ],
        });

        post = post.toJSON();
        post.createdAt = moment(post.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
        );

        let likes = post.reacciones.filter((reaccion) => reaccion.like);
        let dislikes = post.reacciones.filter((reaccion) => !reaccion.like);
        post.likes = likes.length;
        post.dislikes = dislikes.length; 

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
