/* const { faker } = require("@faker-js/faker");
const fs = require("fs");

function generadorMensajes(n) {
    return Array(n).fill(null).map((_, i) => ({
        author: {
            email: faker.internet.email(),
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            edad: faker.datatype.number({min: 18, max: 65}),
            alias: faker.internet.userName(),
            avatar: faker.internet.avatar()
        },
        comment: {
            texto: faker.lorem.paragraph(),
            _id: faker.database.mongodbObjectId()
    }}))
}

const dataMensajes = generadorMensajes()
    try {
        fs.writeFileSync(__dirname +"/../dataBases/posts.json", JSON.stringify(dataMensajes, null, 2), "utf-8");
    } catch (err) {
        console.log(err)
    }

module.exports = generadorMensajes */