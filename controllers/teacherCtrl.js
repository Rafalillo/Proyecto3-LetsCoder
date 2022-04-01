const Teacher = require("../models/teachers")

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

const teacherCtrl = {
    newTeacher: async (req, res) => {
        try {
            
            const file = req.files.file;
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    msg: "No has seleccionado ninguna imagen"
                })
            }
            console.log(req.files)
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({
                    msg: "Imagen demasiado grande"
                })
            }
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath)
                return res.status(400).json({
                    msg: "Formato de imagen no valido"
                })
            }

            await cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: "KaiYoga-teacher"
            }, async (err, result) => {
                if (err) throw err;

                removeTmp(file.tempFilePath)

            const {teacherName, biography} = req.body;
            const teacher2 = await Teacher.findOne({teacherName});
            if (teacher2) {
                return res.status(400).json({
                    msg: "El profesor ya está en la base de datos"
                })
            }
                const teacher = new Teacher({
                    teacherName, 
                    biography,
                    image: result.secure_url,
                    imageId: result.public_id
                })

                let newTeacher = await teacher.save()
                
                res.json({
                    msg: "Profesor creado",
                    teacher: newTeacher
                })
                
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    getTeacher: async (req, res) => {
        try {
            const teacher = await Teacher.find({})
            return res.json({
                teacher
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    updateTeacher: async (req, res) => {
        try {
            const {teacherName, biography, photoTeacher} = req.body;
            await Teacher.findByIdAndUpdate({_id: req.params.id}, {
                teacherName: teacherName.toUpperCase(), biography, photoTeacher
            })
            res.json({msg: "Datos profesor actualizados"})
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    deleteTeacher: async (req, res) => {
        try {

            const {id} = req.params
            const{public_id} = req.body
            if (!public_id) {
                return res.status(400).json({
                    msg: "No se ha seleccionado imagen"
                })
            }

            await Teacher.findByIdAndDelete(req.params.id)
            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if (err) throw err;
            })
            return res.status(200).json({msg:"Profesor borrado"})
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

module.exports = teacherCtrl