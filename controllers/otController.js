import OT from "../models/OT.js";
import path from "path";
import fs from "fs";
import archiver from "archiver";

const obtenerOTs = async (req, res) => {
  const ots = await OT.find();
  res.json(ots);
};
const nuevaOT = async (req, res) => {
  const otPictures = req.files.map((file) => ({
    name: file.originalname,
    url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
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

  ot.ot_number = req.body.ot_number || ot.ot_number;
  ot.om_number = req.body.om_number || ot.om_number;
  ot.init_date = req.body.init_date || ot.init_date;
  ot.end_Date = req.body.end_Date || ot.end_Date;
  ot.ot_Description = req.body.ot_Description || ot.ot_Description;
  ot.value = req.body.value || ot.value;
  ot.solped = req.body.solped || ot.solped;
  ot.aviso = req.body.aviso || ot.aviso;
  ot.oc_number = req.body.oc_number || ot.oc_number;
  ot.oc_Date = req.body.oc_Date || ot.oc_Date;
  ot.gd_number = req.body.gd_number || ot.gd_number;
  ot.gd_Date = req.body.gd_Date || ot.gd_Date;
  ot.HES = req.body.HES || ot.HES;
  ot.HES_Date = req.body.HES_Date || ot.HES_Date;
  ot.factura_number = req.body.factura_number || ot.factura_number;
  ot.factura_Date = req.body.factura_Date || ot.factura_Date;
  ot.observaciones = req.body.observaciones || ot.observaciones;
  ot.ot_pictures = req.body.ot_pictures || ot.ot_pictures;
  ot.ot_state = req.body.ot_state || ot.ot_state;

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

    const zip = archiver("zip", {
      zlib: { level: 9 }, // set compression level
    });

    zip.on("error", function (err) {
      throw err;
    });


    // Ruta al archivo que se agregará al archivo zip
    const filePath = 'public/uploads/1681156967555-SERVO_software.pdf';
    
    // Agregar el archivo al archivo zip
    zip.file("uploads/1681156967555-SERVO_software.pdf", fs.readFileSync("./public/uploads/1681156967555-SERVO_software.pdf"), { name: "1681156967555-SERVO_software.pdf" });
    

    // Agrega cada archivo de la OT al archivo zip
    /* ot.ot_pictures.forEach((picture) => {
      const filePath = picture.url;
      if (fs.existsSync(filePath)) {
        zip.file(filePath, { name: picture.name });
        console.log(`File added to zip: ${picture.name}`);
        console.log(picture.url);
      } else {
        console.log("La ruta está mala");
      }
    }); */

    // Envía el archivo zip al cliente
    console.log(
      `Sending zip file ${ot.ot_number}.zip with ${zip.pointer()} bytes`
    );
    res.attachment(`${ot.ot_number}.zip`);
    // Log cuando se agrega un archivo al zip
    zip.on("entry", function (entry) {
      console.log("Added file to zip:", entry.name);
    });

    // Log cuando se termina de construir el zip
    zip.on("finish", function () {
      console.log("Zip finished:", zip.pointer() + " total bytes");
    });
    zip.pipe(res);
    zip.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export { obtenerOTs, nuevaOT, obtenerOT, editarOT, eliminarOT, obtenerFiles };
