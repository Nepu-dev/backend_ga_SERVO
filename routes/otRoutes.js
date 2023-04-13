import express from "express";

import {
    obtenerOTs,
    nuevaOT,
    obtenerOT,
    editarOT,
    eliminarOT,
    obtenerFiles,
    obtenerCheckOTs
} from "../controllers/otController.js";
import checkAuth from "../middleWare/checkAuth.js";
import upload from "../config/multer.js";

const router = express.Router();

router
    .route('/')
    .get(checkAuth, obtenerOTs)
    .post(checkAuth, upload.array('ot_pictures'), nuevaOT)

router.route('/checkedOTs').get(checkAuth, obtenerCheckOTs)
router
    .route('/:id')
    .get(checkAuth, obtenerOT)
    .put(checkAuth, upload.array('ot_pictures'), editarOT)
    .delete(checkAuth, eliminarOT);

router.get('/files/:id', checkAuth, obtenerFiles);
/* router.post('/agregar-file/:id', checkAuth, agregarIMG);
router.post('/eliminar-file/:id', checkAuth, eliminarIMG); */



export default router;