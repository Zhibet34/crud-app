const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const DB = require('../models/Date_Planingf');
const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest: 'temp-folder-image/' });

router.post('/restaurant', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Photo is required" }); // Changed status to 400
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "restaurants",
            public_id: `${Date.now()}-${req.file.originalname.split('.')[0]}`,
            transformation: [
                { width: 800, crop: 'scale' },
                { quality: 'auto' }
            ]
        });

        const { 
            title,
            author,
            street,
            apartment,
            borough,
            zipCode,
            rating,
            description
        } = req.body;
        
        const address = `${street} ${apartment} ${borough} ${zipCode}`;
        const newRestaurant = new DB({
            title: title,
            photo: result.secure_url,
            author: author,
            body: description,
            address: address,
            favorite: rating
        }); 
       
        await newRestaurant.save();

        // Clean up temp file
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            message: 'Restaurant was created successfully',
            restaurant: {
                id: newRestaurant._id,
                title: newRestaurant.title,
                photo: newRestaurant.photo
            }
        });
    } catch (error) {
        console.error("Error:", error);
        // Clean up temp file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: "Failed to create restaurant" },error);
    }
});

module.exports = router;