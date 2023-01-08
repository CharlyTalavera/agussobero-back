const { Router } = require("express")
const router = Router()
const Contenedor = require ("../utils/contenedorProducto")
const productos = new Contenedor("./productos.json")
const knex = require("knex")
const knexConfig = require("../dataBases/knex/knexfile")
const database = knex(knexConfig)
const tableName = "productos"

router.get("/", async (req, res) => {
    try {
        listaProductos = await database(tableName).select()
        res.send(listaProductos)
    } catch (err) {
        console.log(err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const productoId = await database(tableName)
            .select()
            .where("id", id)
        res.send(productoId)
    } catch (err) {
        console.log(err)
    }
})

router.post("/", async (req, res) => {
    const body = req.body
    try {
        const productoNuevo = {
            name: body.name,
            price: body.price
        }
        const resultado = await database(tableName)
        .insert(productoNuevo)
        res.send({...productoNuevo, id: resultado[0]})
    } catch (err) {
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    const body = req.body
    id = parseInt(req.params.id)
    try {
        const productoNuevo = {
            name: body.name,
            price: body.price
        }
        const resultado = await database(tableName)
        .where({id: id})
        .update(productoNuevo)
        res.send({productoNuevo, id: resultado})
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id", async (req, res) => {
    id = req.params.id
    const resultado = await database(tableName)
    .where({id: +id})
    .del()
    res.send("producto eliminado")
})

module.exports = router