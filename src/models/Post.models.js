import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Post = sequelize.define(
    "Posts",
    {
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName: "Posts",
        timestamps: true,
    }
);

export default Post;
