const Lessons = require('../models/Lessons');
const Teacher = require('../models/teachers')
var ObjectId = require('mongodb').ObjectID;

const lessonCtrl = {
    getLessons: async (req, res) => {
        try {
            const lesson = await Lessons.find({})
            res.json({
                msg: `Clase encontrada`,
                lesson
                
            })
        } catch (err) {
            return res.status(500).json({
                msg: "fallo 1"
            })
        }
    },
    createLesson: async (req, res) => {
        
        try {
            const {teacherNameid} = req.body;
            let findTeacher = await Teacher.findById(teacherNameid);
            if (!findTeacher) {
                return res.status(400).json({
                    success: false,
                    msg: "Falta el profesor"
                })
            }
            const {lessonName, description, teacherName, time, price} = req.body
            const lesson = new Lessons({
                lessonName, description, teacherName: teacherNameid, time, price})
            await lesson.save()
            return res.status(200).send({
                msg: "Clase creada"
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    deleteLesson: async (req, res) => {
        try {
            await Lessons.findByIdAndDelete(req.params.id)
            return res.json({msg:"Clase borrada"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateLesson: async (req, res) => {
        try {
            const {lessonName, description, teacher, time, price} = req.body
            await Lessons.findByIdAndUpdate({_id: req.params.id}, {
                lessonName, description, teacher, time, price
            })
            res.json({msg: "Clase actualizado"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = lessonCtrl