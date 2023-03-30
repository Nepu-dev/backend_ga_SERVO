import express from "express";
const router = express.Router();
import { register, auth, forgotPassword, comprobarToken, nuevoPassword, perfil } from "../controllers/userController.js";
import checkAuth from "../middleWare/checkAuth.js";

//Autenticacion, registro y confirmacion de usuario.
router.post("/", register); //Crea un nuevo usuario.
router.post("/login", auth);
router.post('/olvide-password', forgotPassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

router.get("/perfil", checkAuth, perfil);

export default router;