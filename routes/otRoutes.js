import express from "express";

import {
    obtenerOTs,
    nuevaOT,
    obtenerOT,
    editarOT,
    eliminarOT,
    obtenerFiles,
    mostrarFiles
} from "../controllers/otController.js";
import checkAuth from "../middleWare/checkAuth.js";
import upload from "../config/multer.js";

const router = express.Router();

router
    .route('/')
    .get(checkAuth, obtenerOTs)
    .post(checkAuth, upload.array('ot_pictures'), nuevaOT)

router
    .route('/:id')
    .get(checkAuth, obtenerOT)
    .put(checkAuth, upload.array('ot_pictures'), editarOT)
    .delete(checkAuth, eliminarOT);

router.get('/files/:id', checkAuth, obtenerFiles);
router.get('/file/:id', checkAuth, mostrarFiles);
/* router.post('/agregar-file/:id', checkAuth, agregarIMG);
router.post('/eliminar-file/:id', checkAuth, eliminarIMG); */



export default router;