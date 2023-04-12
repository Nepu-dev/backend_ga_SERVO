import multer from "multer";

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
});

export default upload;
