const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const encodingFile = file.originalname.slice(file.originalname.indexOf('.'));
        if (encodingFile === '.jpg' || encodingFile === '.png');
        cb(null, file.fieldname + '-' + Date.now() + encodingFile);
    }
})
var upload = multer({storage: storage});
const app = express();

const tasksRotues = require('./routes/tasks');

const galleryRoutes = require('./routes/gallery');

app.post('/gallery', upload.single('avatar'), function (req, res, next) {
    // req.file - файл `avatar`
    // req.body сохранит текстовые поля, если они будут
});

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/tasks', tasksRotues);
app.use('/gallery', galleryRoutes);

// Error handling
app.use((err, req, res, next) => {
    const {message} = err;
    res.json({status: 'ERROR', message});
});

app.listen(8080);
