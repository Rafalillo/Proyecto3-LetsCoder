const Reserve = require("../models/Reserve");
const User = require("../models/User")
const Lessons = require("../models/Lessons")
var ObjectId = require('mongodb').ObjectID;
let puppils = 0;

const reserveCtrl = {
    newReserve: async (req, res) => {
        try {
            const {id} = req.user
            if (puppils > 9) {
                return res.status(400).send({
                    succes: false,
                    message: "La clase está llena"
                })
            } else {
                puppils += 1;
            }
            
            const {lessonNameId} = req.body
            if (!lessonNameId) {
                return res.status(400).send({
                    succes: false,
                    message: "Faltan datos"
                })
            }
            let finduser = await User.findById(id)
            if (!finduser) {
                return res.status(400).send({
                    succes: false,
                    message: "no hay usuario"
                })
            }
            let findlesson = await Lessons.findById(lessonNameId)
            if (!findlesson) {
                return res.status(400).send({
                    succes: false,
                    message: "no hay clase"
                })
            }
            const reserve = new Reserve({
                userName: id,
                lessonName: lessonNameId
            })
            await reserve.save()
            return res.json({
                message: "Reserva confirmada",
                reserve
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getReserve: async (req, res) => {
        const {id} = req.params
    try {
        let reserve = await Reserve.findById(id).populate({ path: `userName`, select: `userName surname`})
        .populate({path: `lessonName`, select: `price teacherName description lessonName`})
        return res.json({
            reserve
        })
    } catch(error) {
        res.status(500).send({
            succes:false,
            message: error.message
        })
    }
    },
    deleteReserve: async (req, res) => {
        const {id} = req.params
        try {
            await Reserve.findByIdAndDelete(id)
            puppils -=1;
            return res.status(200).send({
                succes: true,
                message: "Reserva eliminada"
            })
        }
        catch (error) {
            res.status(500).send({
                succes: false,
                message: error.message
            })
        }
    }
}

module.exports = reserveCtrl