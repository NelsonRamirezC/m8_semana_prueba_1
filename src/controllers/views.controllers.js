const home = (req, res) => {
    res.render("home");
}

const login = (req, res) => {
    res.render("login");
};
const registro = (req, res) => {
    res.render("registro");
};

const posts = (req, res) => {
    res.render("posts");
};

const controladores = {
    home,
    login,
    registro,
    posts
}

export default controladores;