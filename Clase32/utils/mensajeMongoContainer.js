const {normalize, schema, denormalize}= require("normalizr")

class MensajeMongoContainer {
    constructor(Schema) {
        this.Schema = Schema
    }

    getAll = async () => {
        try {
            const data = await this.Schema.find()
            const _data = data.map(msg => {
                return {...msg._doc, _id: msg._id.toString()}
            })
            const author = new schema.Entity('author', {}, {idAttribute: 'email'})
            const comments = new schema.Entity('comment', {author}, {idAttribute: '_id'})

            const _result = normalize(_data, [comments])
            return _result
        } catch (err) {
            logger.log("error", `Ocurrió un error ${err}`)
        }
    }

    save = async (mensaje) => {
        try {
            return await new this.Schema(mensaje).save()
        } catch (error) {
            logger.log("error", `Ocurrió un error ${err}`)
        }
    }
}

module.exports = MensajeMongoContainer