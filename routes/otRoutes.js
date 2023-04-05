import express from "express";

import {
    obtenerOTs,
    nuevaOT,
    obtenerOT,
    editarOT,
    eliminarOT,
    agregarIMG,
    obtenerIMGS,
    eliminarIMG
} from "../controllers/otController.js";
import checkAuth from "../middleWare/checkAuth.js";
import upload from "../config/multer.js";

const router = express.Router();

router.use(upload.array('ot_pictures', 20));

router
    .route('/')
    .get(checkAuth, obtenerOTs)
    .post(checkAuth, nuevaOT)

router
    .route('/:id')
    .get(checkAuth, obtenerOT)
    .put(checkAuth, editarOT)
    .delete(checkAuth, eliminarOT);

router.get('/imgs/:id', checkAuth, obtenerIMGS);
router.post('/agregar-img/:id', checkAuth, agregarIMG);
router.post('/eliminar-img/:id', checkAuth, eliminarIMG);



export default router;