import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Reaccion = sequelize.define(
    "Reacciones",
    {
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: "Reacciones",
        timestamps: true,
    }
);

export default Reaccion;
