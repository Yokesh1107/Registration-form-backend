const mongoose = require('mongoose')
const { Schema, model } = mongoose

const registerSchema = new Schema({
    TeamLeader: {
        type: String,
        required: true,
    },
    teammate1: {
        type: String,
        required: true,
    },
    teammate2: {
        type: String,
        required: true,
    },
    teammate3: {
        type: String,
    },
    mail: {
        type: String,
        required: true,
    },
    collegename: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    event1: {
        type: String,
    },
    event2: {
        type: String,
    },
    event3: {
        type: String,
    },
    event4: {
        type: String,
    },
    event5: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})
const registerModel = model('register', registerSchema)
module.exports = registerModel