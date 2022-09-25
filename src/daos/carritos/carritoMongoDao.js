const CarritoMongoController = require("../../controllers/mongo/carritos/carritoMongoController")
const config = require("../../config/config")
const mongoose = require("mongoose")
const { Schema } = mongoose

const carritoSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    timestamp: {type: Number},
    productos: {type: Array}
})

class carritoMongoDao extends CarritoMongoController {
    constructor() {
        super ("carritos", carritoSchema)
    }
}

module.exports = carritoMongoDao