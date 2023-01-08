/* import { faker } from '@faker-js/faker'; */
const {faker} = require("@faker-js/faker")


function generadorProductos (cant) {
    const testProductos = []
    for(let i=0; i<cant; i++) {
        testProductos.push({
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.business(0,0,true)
        })
    }
    return testProductos
    
}

module.exports = generadorProductos