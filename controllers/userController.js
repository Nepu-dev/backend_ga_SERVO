import User from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const register = async (req, res) => {
    //Evitar duplicados
    const { user } = req.body;
    const existeUsuario = await User.findOne({ user });

    if (existeUsuario) {
        const error = new Error("Usuario ya existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generarJWT(user._id);
        const userStored = await user.save();
        res.json(userStored);
    } catch (error) {
        console.log(error);
    }
}

const auth = async (req, res) => {
    const {user, password} = req.body;
    //Comprobar si el usuario existe
    const usuario = await User.findOne({ user });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }
    //Comprobar password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            user: usuario.user,
            token: generarJWT(usuario._id)
        })
    }else{
        const error = new Error("El password es incorrecto");
        return res.status(404).json({ msg: error.message });
    }
}

const forgotPassword = async (req, res) => {
    const { user } = req.body;
    const usuario = await User.findOne({ user });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId()
        await usuario.save();
        res.json({ msg: "Hemnos enviado un email con las instrucciones" });
    } catch (error) {
        console.log(error);
    }

}

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await User.findOne({ token });
    if (tokenValido) {
        res.json({ msg: "Token valido y el usuario existe." })
    } else {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message });
    }

}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await User.findOne({ token });

    if (usuario) {
        usuario.password = password;
        usuario.token = "";
        try {
            await usuario.save();
            res.json({ msg: "Password modificada correctamente." });
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message });
    }

}

const perfil = async (req, res) => {
    const { usuario } = req;

    res.json(usuario);
}

export { register, auth, forgotPassword, comprobarToken, nuevoPassword, perfil };