const {Schema, model} = require("mongoose")

const productoSchema = new Schema({
    nombre: {type: String, require: true},
    precio: {type: Number, require: true},
    foto: {type: String, require: true}
}, {timestamps: true})

const Producto = new model("productos", productoSchema)

module.exports = Producto