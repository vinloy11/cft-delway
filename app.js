const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const tasksRotues = require('./routes/tasks');

const galleryRoutes = require('./routes/gallery');

// app.post('/gallery', upload.single('avatar'), function (req, res, next) {
//     // req.file - файл `avatar`
//     // req.body сохранит текстовые поля, если они будут
//     console.log(req)
// });

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/tasks', tasksRotues);
app.use(express.static(path.join(__dirname, '/')));
app.use('/gallery', galleryRoutes);

// Error handling
app.use((err, req, res, next) => {
    const {message} = err;
    res.json({status: 'ERROR', message});
});

app.listen(8080);
