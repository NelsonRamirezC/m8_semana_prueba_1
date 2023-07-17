import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Comentario = sequelize.define(
    "Comentarios",
    {
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "Comentarios",
        timestamps: true,
    }
);

export default Comentario;
