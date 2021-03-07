const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { isLogin, isAdmin } = require("../middlewares/auth");

const storagePicture = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const uploadImages = multer({
  storage: storagePicture,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

router.post(
  "/image",
  // isLogin,
  // isAdmin,
  uploadImages.single("file"),
  function (req, res) {
    // const fullUrl = req.protocol;
    // const { host } = req.headers;
    const urlFile = `http://localhost:4000/images/${req.file.filename}`;
    res.send({
      status: 200,
      message: "Your file is successfully uploaded",
      url: urlFile,
    });
  }
);

module.exports = router;
