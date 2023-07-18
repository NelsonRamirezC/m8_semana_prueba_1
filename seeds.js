import sequelize from "./src/database/database.js";
import bcrypt from "bcrypt";

//modelos
import "./src/models/asociaciones.js";
import Usuario from "./src/models/Usuario.models.js";
import Post from "./src/models/Post.models.js";

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log("conectado con éxito a la base de datos.");
        await sequelize.sync({force: true});
        //insertar usuarios de prueba
        //datos de usuario [nombre, apellido, password, email]
        let password = "123456";
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        let usuario1 = await Usuario.create({
            nombre: "Carlos",
            apellido: "Osorio",
            password: passwordHash,
            email: "carlos@gmail.com",
        });

        let usuario2 = await Usuario.create({
            nombre: "Juan",
            apellido: "Godoy",
            password: passwordHash,
            email: "juan@gmail.com",
        });

        //insertar posts de prueba
        //datos de posts [titulo, contenido, imagen(url), autorId]
        //nombre imagen prueba  default.jpeg

        await Post.create({
            titulo: "Post 1",
            contenido: "Contenido post 1",
            imagen: "/public/uploads/default.jpeg",
            autorId: usuario1.id
        });

        await Post.create({
            titulo: "Post 2",
            contenido: "Contenido post 2",
            imagen: "/public/uploads/default.jpeg",
            autorId: usuario2.id,
        });

        await sequelize.close();

    } catch (error) {
        console.log("ha un ocurrido un error", error);
    }
};

main();
