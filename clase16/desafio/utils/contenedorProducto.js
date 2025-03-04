const fs = require("fs");

class Container {
    constructor (filename) {
        this.filename = filename
    }

    save = async (object)=> {
        let id =""
        try{
            const objects = await this.getAll()
            object.id = objects.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
            const objectNew = {...object, id: object.id}
            objects.push(objectNew)
            await fs.promises.writeFile(this.filename, JSON.stringify(objects, null, 2))
        }
        catch(err) {
            console.log(err)
        }
    }

    getById = async (id)=> {
        try{
            const objects = await this.getAll()
            const object = objects.filter(obj => obj.id === id)
            return object
        }
        catch(err) {
            console.log(err)
        }
    }

    getAll = async ()=> {
        try{
            const objects = await fs.promises.readFile(this.filename, "utf-8");
            const cont = await JSON.parse(objects)
            if(objects) {
                return cont
            }
            else {
                return []
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    deleteById = async (id)=> {
        try{
            const objects = await this.getAll().then(objects=> {
                return objects.filter(obj=> obj.id !== id)
            }
            )
            await fs.promises.writeFile(this.filename, JSON.stringify(objects, null, 2))
        }
        catch(err) {
            console.log(err)
        }
    }

    deleteAll = async()=> {
        try{
            await fs.promises.writeFile(this.filename, "[]")
        }
        catch(err) {
            console.log(err)
        }
    }

    getRandom = async()=> {
        const product = await this.getAll().then(
            (products)=> products[Math.floor(Math.random() * products.length)]
        )
        return product
    }

    updateById = async (id, productoNuevo) =>{
        const productos = await this.getAll()
        const producto = await productos.find(producto => producto.id == id)
        const index = productos.indexOf(producto)
        productos[index] = {...productoNuevo, id: id}
        await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2))
    }
} 

module.exports = Container

