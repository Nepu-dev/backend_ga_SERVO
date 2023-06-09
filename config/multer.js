const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop();
    cb(null, Date.now() + '.' + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      return cb(new Error('Solo se permiten archivos en formato .PDF'));
    }
    cb(null, true);
  }
});

module.exports = upload;
