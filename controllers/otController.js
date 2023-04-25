import OT from "../models/OT.js";
import path from "path";
import fs from "fs";
import JSZip from "jszip";

const obtenerOTs = async (req, res) => {
  const ots = await OT.find();
  res.json(ots);
};


const nuevaOT = async (req, res) => {
  const otPictures = req.files.map((file) => ({
    name: file.originalname,
    url: `public/uploads/${file.filename}`,
  }));
  const otData = {
    ...req.body,
    ot_pictures: otPictures,
  };

  const ot = new OT(otData);
  try {
    const otAlmacenada = await ot.save();
    res.json(otAlmacenada);
  } catch (error) {
    console.log(error);
  }
};
const obtenerOT = async (req, res) => {
  const { id } = req.params;

  const ot = await OT.findById(id);

  if (!ot) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  res.json(ot);
};
const editarOT = async (req, res) => {
  const { id } = req.params;

  const ot = await OT.findById(id);

  if (!ot) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  const otPictures = req.files.map((file) => ({
    name: file.originalname,
    url: `public/uploads/${file.filename}`,
  }));

  ot.ot_number = req.body.ot_number || ot.ot_number;
  ot.om_number = req.body.om_number || ot.om_number;
  ot.init_Date = req.body.init_Date || ot.init_Date;
  ot.end_Date = req.body.end_Date || ot.end_Date;
  ot.ot_Description = req.body.ot_Description || ot.ot_Description;
  ot.value = req.body.value || ot.value;
  ot.solped = req.body.solped || ot.solped;
  ot.aviso = req.body.aviso || ot.aviso;
  ot.oc_number = req.body.oc_number || ot.oc_number;
  ot.oc_Date = req.body.oc_Date || ot.oc_Date;
  ot.gd_number_client = req.body.gd_number_client || ot.gd_number_client;
  ot.gd_Date_client = req.body.gd_Date_client || ot.gd_Date_client;
  ot.gd_number = req.body.gd_number || ot.gd_number;
  ot.gd_Date = req.body.gd_Date || ot.gd_Date;
  ot.ep_Date = req.body.ep_Date || ot.ep_Date;
  ot.HES = req.body.HES || ot.HES;
  ot.HES_Date = req.body.HES_Date || ot.HES_Date;
  ot.factura_number = req.body.factura_number || ot.factura_number;
  ot.factura_Date = req.body.factura_Date || ot.factura_Date;
  ot.observaciones = req.body.observaciones || ot.observaciones;
  ot.ot_state = req.body.ot_state || ot.ot_state;
  ot.ot_pictures = ot.ot_pictures.concat(otPictures);

  try {
    const otAlmacenado = await ot.save();
    res.json(otAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
const eliminarOT = async (req, res) => {
  const { id } = req.params;

  const ot = await OT.findById(id);

  if (!ot) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  try {
    await ot.deleteOne();
    res.json({ msg: "OT Eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerFiles = async (req, res) => {
  try {
    const ot = await OT.findById(req.params.id);

    if (!ot) {
      return res.status(404).send("OT not found");
    }

    // Crear un archivo ZIP y agregar los archivos que desees
    const zip = new JSZip();
    ot.ot_pictures.map( file => {
      const fileContent = fs.readFileSync(file.url);
      zip.file(file.name, fileContent);
    })
    // Generar el archivo ZIP y enviarlo al cliente
    zip.generateAsync({ type: "nodebuffer" }).then(function (content) {
      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=myZipFile.zip",
      });
      res.send(content);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const mostrarFiles = async (req, res) => {
  const index = req.params.index;
  console.log(req.params);
  try {
    const ot = await OT.findById(req.params.id);
    if (!ot) {
      return res.status(404).json({ message: "OT not found" });
    }

    const pictures = ot.ot_pictures.map((p) => p.url);
    if (!pictures.length) {
      return res.status(404).json({ message: "Pictures not found" });
    }

    let fileData = null;
    pictures.forEach((url, i) => {
      const filePath = url;
      const data = fs.readFileSync(filePath);
      if (i == index) {
        fileData = data;
      }
    });

    res.contentType("application/pdf");
    res.send(fileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export { obtenerOTs, nuevaOT, obtenerOT, editarOT, eliminarOT, obtenerFiles, mostrarFiles };
