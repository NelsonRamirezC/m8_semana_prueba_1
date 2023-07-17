import Post from "../models/Post.models.js";
import Usuario from "../models/Usuario.models.js";
import moment from "moment";
moment.locale("es");

const home = async (req, res) => {
    let posts = await Post.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: Usuario,
                as: "autor",
                attributes: ["nombre", "apellido"],
            },
        ],
    });

    posts = posts.map((post) => {
        post.nombreAutor = post["autor.nombre"];
        delete post["autor.nombre"];
        post.apellidoAutor = post["autor.apellido"];
        delete post["autor.apellido"];
        post.createdAt = moment(post.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
        );
        return post;
    });
    console.log(posts);

    res.render("home", {
        posts,
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

    let post = await Post.findByPk(id, {
        raw: true,
        include: [
            {
                model: Usuario,
                as: "autor",
                attributes: ["nombre", "apellido"],
            },
        ],
    });

    console.log(post);
    post.nombreAutor = post["autor.nombre"];
    delete post["autor.nombre"];
    post.apellidoAutor = post["autor.apellido"];
    delete post["autor.apellido"];
    post.createdAt = moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a");

    try {
        res.render("detallePost", {
            post,
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
