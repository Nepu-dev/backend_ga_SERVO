const express = require("express");
const router = express.Router();
const { register, auth, forgotPassword, comprobarToken, nuevoPassword, perfil } = require("../controllers/userController.js");
const checkAuth = require("../middleWare/checkAuth.js");

//Autenticacion, registro y confirmacion de usuario.
router.post("/", register); //Crea un nuevo usuario.
router.post("/login", auth);
router.post('/olvide-password', forgotPassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

router.get("/perfil", checkAuth, perfil);

module.exports = router;