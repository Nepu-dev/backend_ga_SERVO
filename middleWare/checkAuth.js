const jwt = require("jsonwebtoken");
const User = require("../models/Usuario.js");

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.usuario = await User.findById(decoded.id).select("-password -token -createdAt -updatedAt -__v");
            return next();
        } catch (error) {
            return res.status(404).json({ msg: 'Hubo un error de autenticación'});
        }
    }
    if (!token) {
        const error = new Error('Token no valido');
        return res.status(401).json({ msg: error.message });
    }

    next();
};

module.exports = checkAuth;