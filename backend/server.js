const express = require('express')
const app = express()
const cors= require('cors')
const cookieParser= require('cookie-parser')
const PORT = process.env.PORT || 5001;
const path=require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname)); 
app.use(cors());
app.use(cookieParser());
app.use('/file_upload', express.static(path.join(__dirname, '/file_upload')));

let routes=require('./route/index')
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
