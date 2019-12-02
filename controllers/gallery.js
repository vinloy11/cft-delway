const shortid = require('shortid');
const {validate} = require('jsonschema');
const db = require('../db/db');

const getGallery = (req, res, next) => {
    let gallery = [];
    try {
        gallery = db.get('gallery');
    } catch (error) {
        throw new Error(error);
    }
    res.json({status: 'OK', data: gallery});
};

const getPhoto = (req, res, next) => {
    const {id} = req.params;

    const photo = db
        .get('photo')
        .find({id})
        .value();

    if (!photo) {
        throw new Error('PHOTO_NOT_FOUND');
    }

    res.json({status: 'OK', data: photo});
};

const createPhoto = (req, res, next) => {
    const photoSchema = {
        type: 'object',
        properties: {
            title: {type: 'string'},
            description: {type: 'string'}
        },
        required: ['title', 'description'],
        additionalProperties: false
    };

    const validationResult = validate(req.body, photoSchema);
    if (!validationResult.valid) {
        throw new Error('INVALID_JSON_OR_API_FORMAT');
    }

    const {title, description} = req.body;
    const photo = {
        id: shortid.generate(),
        title,
        description,
        completed: false
    };

    try {
        db.get('photo')
            .push(photo)
            .write();
    } catch (error) {
        throw new Error(error);
    }

    res.json({
        status: 'OK',
        data: photo
    });
};

const editPhoto = (req, res, next) => {
    const {id} = req.params;

    const editedPhoto = db
        .get('photo')
        .find({id})
        .assign(req.body)
        .value();

    db.write();

    res.json({status: 'OK', data: editedPhoto});
};

const deletePhoto = (req, res, next) => {
    db.get('gallery')
        .remove({id: req.params.id})
        .write();

    res.json({status: 'OK'});
};



module.exports = {
    getGallery,
    getPhoto,
    createPhoto,
    editPhoto,
    deletePhoto
};
