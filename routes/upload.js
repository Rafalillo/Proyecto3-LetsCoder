const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');
const Product = require("../models/Products");


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', auth, authAdmin, async(req, res, next)=> {
    try {
        const file = req.files.file;
        if (!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({msg:"No has seleccionado ninguna imagen"})
        }
        console.log(req.files)
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Imagen demasiado grande"})
        }
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Formato de imagen no valido"})
        }

        let newFile = await cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "KaiYoga"}, async (err, result) => {
            if (err) throw err;

            removeTmp(file.tempFilePath)

            // res.json({public_id: result.public_id, url: result.secure_url})
            // next()

            const {name, description, image, price} = req.body;
        const product = await Product.findOne({name});
        if (product) {
            return res.json({msg:"El producto ya existe"});
        }
        const newProduct = new Product({
            name, description, image: { public_id: newFile.public_id, url: newFile.secure_url }, price
        })

        await newProduct.save()
        res.json({msg: "Producto creado"})
        })

        

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

router.post('destroy', auth, authAdmin, (req, res) => {
    try {
        const {public_id} = req.body;
        if (!public_id) {
            return res.status(400).json({msg: "No has seleccionado ninguna imagen"})
        }

        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if (err) throw err;

            res.json({msg: "Imagen borrada"})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err=> {
        if(err) throw err;
    })
}

module.exports = router