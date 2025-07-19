const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const DB = require('../models/Date_Planingf');
const router = express.Router();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.VITE_MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapboxToken})


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
            return res.status(400).json({ error: "Photo is required" });
        }

        // Trim whitespace and clean up the filename
        const cleanOriginalName = req.file.originalname
            .split('.')[0] // Remove extension
            .replace(/[^\w-]/g, '') // Remove non-alphanumeric chars
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .toLowerCase(); 
        const publicId = `${Date.now()}-${cleanOriginalName}`;

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "restaurants",
            public_id: publicId,  // Use the cleaned public_id
            transformation: [
                { width: 800, crop: 'scale' },
                { quality: 'auto' }
            ]
        });

        const { 
            title,
            author,
            street,
            state,
            borough,
            zipCode,
            rating,
            description
        } = req.body;
        const geoAddress = `${street} ${borough} ${zipCode}`
        const geoData = await geocoder.forwardGeocode({
            query: geoAddress,
            limit: 1
        }).send()
        
        const address = `${street} ${borough} ${state} ${zipCode}`;
        const newRestaurant = new DB({
            title: title,
            photo: result.secure_url,
            author: author,
            body: description,
            address: address,
            favorite: rating,
            geometry: geoData.body.features[0].geometry
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