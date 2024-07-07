const express = require('express');

const appError = require('../utils/appError')

const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `image-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const imageType = file.mimetype.split("/")[0];
    if (imageType === "image") {
      return cb(null, true);
    } else {
      return cb(appError.create("file must be an image", 400));
    }
  },
});


const diseaseController = require("../controllers/disease.controller")
router.route('/:language/:plant').post(upload.single('image'), diseaseController.predict)


module.exports = router;