const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/gallery')
// GET /gallery
router.get('/', galleryController.getGallery);

// GET /gallery/:id
router.get('/:id', galleryController.getGallery);

// POST /gallery
router.post('/', galleryController.createPhoto);

// PATCH /gallery/:id
router.patch('/:id', galleryController.editPhoto);

// DELETE /gallery/:id
router.delete('/:id', galleryController.deletePhoto);

module.exports = router;