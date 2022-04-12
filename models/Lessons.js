const mongoose = require("mongoose");

const LessonsSchema = new mongoose.Schema({
    lessonName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacherName: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher"
    },
    time:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    pupils: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
    
}, {
    timestamps: true
})



module.exports = mongoose.model("Lessons", LessonsSchema)