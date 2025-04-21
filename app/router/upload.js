const express = require('express');
const router = express.Router();
const { upload, uploadImage, deleteImage } = require('../controllers/upload');

// Upload single image
router.post('/image', upload.single('image'), uploadImage);

// Delete image
router.delete('/image/:filename', deleteImage);

module.exports = router; 