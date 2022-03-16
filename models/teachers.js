const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    photoTeacher: {
        type: Object
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);