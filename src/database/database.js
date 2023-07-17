import Sequelize from "sequelize";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import pg from "pg";
//import "dotenv/config";
import { config } from "dotenv";

let rutaEnv = path.join(__dirname, "/../../.env");
config({ path: rutaEnv });


let database = process.env.DB_DATABASE;
let username = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 20000,
        idle: 5000,
    },
    dialectModule: pg,
});

export default sequelize;
