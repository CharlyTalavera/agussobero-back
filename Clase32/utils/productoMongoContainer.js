
class ProductoMongoContainer {
    constructor(Schema) {
        this.Schema = Schema
    }

    getAll = async ()=> {
        try{
            return await this.Schema.find()
        } catch(err) {
            logger.log("error", `Ocurrió un error ${err}`)} 
    }

    save = async (producto)=> {
        try{
            return await new this.Schema(producto).save()
        } catch (err) {
            logger.log("error", `Ocurrió un error ${err}`)
        }
    }
}

module.exports = ProductoMongoContainer