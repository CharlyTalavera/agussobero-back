const {Schema, model} = require("mongoose")

const mensajeSchema = new Schema({
    autor: {type: Object, require: true},
    mensaje: {type: Object, require: true},
}, {timestamps: true})

const Mensaje = new model("mensajes", mensajeSchema)

module.exports = Mensaje