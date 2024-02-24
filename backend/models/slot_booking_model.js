const mongoose = require('../database/db');
const Schema = mongoose.Schema;

var SlotbookingSchema = new Schema({
    car_number: {
        type: String, 
        unique: true
    },
    owner_name: {
        type: String,
    },
    starting_date: {
        type: Date,
    },
    ending_date: {
        type: Date,
    },
    staring_time: {
        type: String,
    },
    ending_time: {
        type: String,
    },
    slot_number: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    parking_status: {
        type: String,
        enum : ['available','booked'],
        default: 'booked'
    },
    car_size: {
        type: String,
        enum : ['small','medium', 'large', 'extra_large'],
    },
    small_count: {
        type: Number,
        default:0
    },
    medium_count: {
        type: Number,
        default:0   }, 
    large_count: {
        type: Number,
        default:0  }, 
    x_large_count: {
        type: Number,
        default:0
    },
    duration: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true 
    },
}, 
{
    timestamps: true
});


const ParkingSlotBooking = mongoose.model('slot_booking', SlotbookingSchema);
module.exports = ParkingSlotBooking;