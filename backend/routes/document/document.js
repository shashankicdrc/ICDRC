const express = require('express');
const Documentrouter = express.Router();
const multer = require('multer');
const path = require('path');

// const Document = require('..//..//models/Document');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '..//..//uploads') // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // File naming scheme
    }
});

// Multer upload configuration
const upload = multer({ storage: storage });



// Route to handle file upload
Documentrouter.post('/upload', upload.single('file'), async (req, res) => {
    console.log("2");
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    try {
        // const newDocument = new Document({
        //     name: req.file.originalname,
        //     path: req.file.path
        // });
        // await newDocument.save();
        res.send('File uploaded successfully!');
    } catch (error) {
        console.log("3");
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = { Documentrouter };