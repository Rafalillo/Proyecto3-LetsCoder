const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        
    },
    biography: {
        type: String,
        
    },
    image: {
        type: Object
    },
    imageId: {
        String
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);