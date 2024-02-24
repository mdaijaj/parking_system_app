const mongoose = require('../database/db');
const Schema = mongoose.Schema;

var parkingSpaceSchema = new Schema({
    number_of_floors: {
        type: String, 
    },
    each_floor: {
        type: String,
    },
    sizeOfslots: {
        type: JSON,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    }, 
    state: {
        type: String,
    }, 
    country: {
        type: String,
    },
    agent_name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true 
    },
}, 
{
    timestamps: true
});


const ParkingSpaceSchema = mongoose.model('parking_onBoarding', parkingSpaceSchema);
module.exports = ParkingSpaceSchema;