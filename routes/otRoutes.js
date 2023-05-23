const express = require("express");

const {
    obtenerOTs,
    nuevaOT,
    obtenerOT,
    editarOT,
    eliminarOT,
    obtenerFiles,
    mostrarFiles,
    eliminarFile
} = require("../controllers/otController.js");
const checkAuth = require("../middleWare/checkAuth.js");
const upload = require("../config/multer.js");

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
router.get('/file/:id/:index', checkAuth, mostrarFiles);
router.delete('/file/:id/:index', checkAuth, eliminarFile);
/* router.post('/agregar-file/:id', checkAuth, agregarIMG);
router.post('/eliminar-file/:id', checkAuth, eliminarIMG); */



module.exports = router;