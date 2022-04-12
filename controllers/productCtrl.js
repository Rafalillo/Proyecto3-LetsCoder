const Product = require("../models/Products");
const upload = require('../routes/upload');
const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
var ObjectId = require('mongodb').ObjectID;
require('dotenv').config();
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const productCtrl = {

    getProducts: async (req, res) => {
        try {
            const product = await Product.find({})
            return res.json({
                result: product.length,
                product: product
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    getOneProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.json({msg: "Producto encontrado",
            product
            })
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    },

    createProduct: async (req, res) => {
        try {
            // const file = req.files.file;
            // if (!req.files || Object.keys(req.files).length === 0) {
            //     return res.status(400).json({
            //         msg: "No has seleccionado ninguna imagen"
            //     })
            // }
            // console.log(req.files)
            // if (file.size > 1024 * 1024) {
            //     removeTmp(file.tempFilePath)
            //     return res.status(400).json({
            //         msg: "Imagen demasiado grande"
            //     })
            // }
            // if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            //     removeTmp(file.tempFilePath)
            //     return res.status(400).json({
            //         msg: "Formato de imagen no valido"
            //     })
            // }

            // await cloudinary.v2.uploader.upload(file.tempFilePath, {
            //     folder: "KaiYoga-product"
            // }, async (err, result) => {
            //     if (err) throw err;

            //     removeTmp(file.tempFilePath)

            //     const { name, description, image, price } = req.body;
            //     const product = await Product.findOne({
            //         name
            //     });
            //     if (product) {
            //         return res.json({
            //             msg: "El producto ya existe"
            //         });
            //     }
            //     const newProduct = new Product({
            //         name,
            //         description,
            //         image: result.secure_url,
            //         imageId: result.public_id,
            //         price
            //     })

            //     await newProduct.save()
            //     res.json({
            //         msg: "Producto creado"
            //     })
            // })
            // const file = req.files.file;
            // if (!req.files || Object.keys(req.files).length === 0) {
            //     return res.status(400).json({
            //         msg: "No has seleccionado ninguna imagen"
            //     })
            // }
            // console.log(req.files)
            // if (file.size > 1024 * 1024) {
            //     removeTmp(file.tempFilePath)
            //     return res.status(400).json({
            //         msg: "Imagen demasiado grande"
            //     })
            // }
            // if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            //     removeTmp(file.tempFilePath)
            //     return res.status(400).json({
            //         msg: "Formato de imagen no valido"
            //     })
            // }
            // console.log(file);
            // await cloudinary.v2.uploader.upload(file.tempFilePath, {
            //     folder: "KaiYoga-product"
            // }, async (err, result) => {
            //     if (err) throw err;

            //     removeTmp(file.tempFilePath)

            const {name, description, image, price} = req.body;
            const product = await Product.findOne({name});
            if (product) {
                return res.status(400).json({
                    msg: "El producto ya está en la base de datos"
                })
            }
                const product2 = new Product({
                    name, 
                    description,
                    image,
                    price
                })

                let NewProduct = await product2.save()
                
                res.json({
                    msg: "Producto creado",
                    product: NewProduct
                })
                
            
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {

            const {id} = req.params
            // const{public_id} = req.body
            // if (!public_id) {
            //     return res.status(400).json({
            //         msg: "No se ha seleccionado imagen"
            //     })
            // }

            await Product.findByIdAndDelete(req.params.id);
            // cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            //     if (err) throw err;
            // })
            return res.status(200).json({
                msg: "Producto borrado"
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {
                name,
                description,
                category,
                price
            } = req.body
            await Product.findByIdAndUpdate({
                _id: req.params.id
            }, {
                name: name.toUpperCase(),
                description,
                price
            })
            res.json({
                msg: "Producto actualizado"
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = productCtrl