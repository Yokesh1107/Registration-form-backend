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
    Scriptorias_secret: {
        type: String,
    },
    Code_Quasar: {
        type: String,
    },
    Mensa_Mingle: {
        type: String,
    },
    Croma_meister: {
        type: String,
    },
    Surprise_event: {
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
