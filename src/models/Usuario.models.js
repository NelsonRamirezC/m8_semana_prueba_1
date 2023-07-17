import { DataTypes } from "sequelize";
import sequelize from "../database/database.js"

const Usuario = sequelize.define(
    "Usuarios",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "El formato debe ser valido para correo."
                }
            }
        },
    },
    {
        tableName: "Usuarios",
        timestamps: false,
    }
);

export default Usuario;