const express = require("express");
const Documentrouter = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { fetchUser } = require("../../middlewares/fetchUser");

const ensureUploadDirectoryExists = (uploadDir) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.id;
    const uploadDir = path.join(__dirname, `../../uploads/${userId}`);
    ensureUploadDirectoryExists(uploadDir);
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // File naming scheme
  },

});

const upload = multer({ storage: storage });

Documentrouter.post(
  "/upload",
  fetchUser,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) return res.status(400).send("No files were uploaded.");

    try {
      // const newDocument = new Document({
      //     name: req.file.originalname,
      //     path: req.file.path
      // });
      // await newDocument.save();
      res.send({ file: req.file.filename });
    } catch (error) {
      console.log("3");
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

Documentrouter.get("/files", fetchUser, (req, res) => {
  try {
    const userId = req.id;
    const uploadDir = path.join(__dirname, `../../uploads/${userId}`);

    // Read the contents of the upload directory
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        res.status(500).send("Error reading directory");
        return;
      }
      // Send the list of files to the client
      res.json({ files });
    });
  } catch (error) {}
});

Documentrouter.delete("/file/:fileName", fetchUser, (req, res) => {
  try {
    const userId = req.id;
    const fileName = req.params.fileName;
    const filePath = path.join(
      __dirname,
      `../../uploads/${userId}/${fileName}`
    );

    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        res.status(500).send("Error deleting file");
        return;
      }

      res.sendStatus(200);
    });
  } catch (error) {}
});
module.exports = { Documentrouter };
