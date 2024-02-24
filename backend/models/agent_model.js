const mongoose = require('../database/db');
const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')
const Schema = mongoose.Schema;

var agent_schema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter valid email id"]
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean ,
        default: true
    }
}, 
{
    timestamps: true
});



//hashing password
agent_schema.pre("save", async function (next) {
    console.log("Hi i am pre password using...")
    if (this.isModified('password')) {
        console.log("password modified...")
        this.password = await Bcrypt.hash(this.password, 12)
    }
    next()
})


//using jwt generate token
agent_schema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ id: this._id }, process.env.Secret || "aijajkhan", { expiresIn: "10 min" });
        return token;
    }
    catch (err) {
        console.log("not token verify", err.message)
    }
}


const User = mongoose.model('Agent', agent_schema);
module.exports = User;