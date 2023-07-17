import Usuario from "./Usuario.models.js";
import Post from "./Post.models.js";


//RELACIÓN ENTRE 1 A MUCHOS USUARIO Y POST
Usuario.hasMany(Post, {
    as: "publicaciones",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "autorId",
});

Post.belongsTo(Usuario, { as: "autor" });
