import Usuario from "./Usuario.models.js";
import Post from "./Post.models.js";
import Comentario from "./Comentario.models.js";

//RELACIÓN ENTRE 1 A MUCHOS USUARIO Y POST
Usuario.hasMany(Post, {
    as: "publicaciones",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "autorId",
});

Post.belongsTo(Usuario, { as: "autor" });

//RELACIÓN ENTRE 1 A MUCHOS USUARIO Y COMENTARIO
Usuario.hasMany(Comentario, {
    as: "comentarios",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "autorId",
});

Comentario.belongsTo(Usuario, {
    as: "autor",
    foreignKey: "autorId",
});

//RELACIÓN ENTRE 1 A MUCHOS POST Y COMENTARIO
Post.hasMany(Comentario, {
    as: "comentarios",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "postId",
});

Comentario.belongsTo(Post, { as: "post", foreignKey: "postId" });
