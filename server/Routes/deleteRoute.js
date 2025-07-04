const express = require('express');
const DB = require('../models/Date_Planingf');
const deleteRoute = express.Router();

deleteRoute.delete('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        console.log('Deleting document with ID:', id);
        const deletedItem = await DB.findByIdAndDelete(id);
        if(!deletedItem){
            return res.status(404).send("Item not Found")
        }
        res.send('the item is deleted')
    } catch (error) {
        console.error("error", error)
        res.status(500).send("Error deletion")
    }
})

module.exports = deleteRoute