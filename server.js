const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authAdmin = require("./middleware/authAdmin");
const auth = require("./middleware/auth");
const fileUpload = require('express-fileupload');
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const path = require ("path");

require("dotenv").config();

app.use(express.json({extended:true}));
app.use(express.urlencoded());
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}));

app.use("/api", require('./routes/UserRouter'));
app.use("/api", require('./routes/TeacherRouter'));
app.use('/api', require('./routes/LessonsRouter'));
app.use('/api', require('./routes/ProductRouter'));
app.use("/api", auth, require('./routes/ReserveRouter'));
app.use('/api', require('./routes/upload'));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
}).then(()=>{
    console.log("BD Conectada")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`servidor a la escucha en puerto ${PORT}`);
})