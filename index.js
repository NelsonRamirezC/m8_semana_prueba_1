import app from "./src/app.js";
import sequelize from "./src/database/database.js";

//modelos


const PORT = process.env.PORT || 3000;

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log("conectado con éxito a la base de datos.");
        await sequelize.sync({ force: false, alter: true });
        app.listen(PORT, () =>
            console.log("Servidor escuchando en puerto: " + PORT)
        );
    } catch (error) {
        console.log("ha un ocurrido un error", error);
    }
};

main();
