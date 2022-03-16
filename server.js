const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authAdmin = require("./middleware/authAdmin");
const auth = require("./middleware/auth");
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json({extended:true}));
app.use(express.urlencoded());
app.use(fileUpload({
    useTempFiles: true
}));

app.use("/api", require('./routes/UserRouter'));
app.use("/api", auth, require('./routes/TeacherRouter'));
app.use('/api', require('./routes/LessonsRouter'));
app.use('/api', require('./routes/ProductRouter'));
app.use("/api", auth, require('./routes/ReserveRouter'));
app.use('/api', require('./routes/upload'));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
}).then(()=>{
    console.log("BD Conectada")
})



app.listen(PORT, () => {
    console.log(`servidor a la escucha en puerto ${PORT}`);
})