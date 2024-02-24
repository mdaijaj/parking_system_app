const mongoose=require('mongoose');
// require('dotenv').config;
// dotenv.config({path: './db.js'})
// let url=process.env.DB || "mongodb://localhost:27017/5d_solution";
let url=process.env.DB || "mongodb+srv://ankesh_kumar:ankeshkumar@cluster0.k5fj9.mongodb.net/parking_system";


mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
}).then(()=>{
    console.log("db connected successfully!")
}).catch((err)=>{
    console.log("errro while connected db,........")
    console.log(err.message)
})


module.exports=mongoose;