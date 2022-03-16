const mongoose = require("mongoose");

const ReserveSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    lessonName: {
        type: mongoose.Types.ObjectId,
        ref:"Lessons"        
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("Reserve", ReserveSchema)