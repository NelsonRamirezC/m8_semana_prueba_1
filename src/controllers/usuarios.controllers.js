import Usuario from "../models/Usuario.models.js";
import bcrypt from "bcrypt";

const registro = async (req, res) => {
    try {
        let { nombre, apellido, email, password } = req.body;

        //HASHEAR PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        let nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            email,
            password: passwordHash,
        });

        res.status(201).json({code: 201, message: "Usuario creado con éxito."})       
        
    } catch (error) {
        res.status(500).json({code: 500, message: "Error en registro de usuario."})
    }
}

const login = (req, res) => {
    try {
        res.json({code: 200, message: "Login con éxito.", token: req.token, usuario: req.usuario})
    } catch (error) {
        res.status(500).json({code: 500, message: "Error en login de usuario."})
    }

}


const controladores = {
    registro,
    login
};

export default controladores;