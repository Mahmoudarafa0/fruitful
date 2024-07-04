const express = require('express');

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


const growthController = require("../controllers/growth.controller");
router.route("/:language/:plant").post(upload.single('image'), growthController.predict);


module.exports = router;