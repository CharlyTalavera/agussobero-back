const { Router } = require("express")
const router = Router()
const Contenedor = require ("../utils/contenedorMensaje")
const mensajes = new Contenedor("./mensajes.json")
const knex = require("knex")
const knexConfig = require("../knexfile-Sqlite")
const database = knex(knexConfig)
const tableName = "mensajes"

router.get("/", async (req, res) => {
    try {
        listaMensajes = await database(tableName).select()
        res.send(listaMensajes)
    } catch (err) {
        logger.log("error", `Ocurrió un error ${err}`)
    }
})

router.post("/", async (req, res) => {
    const body = req.body
    try {
        const mensajeNuevo = {
            email: body.email,
            mensaje: body.mensaje
        }
        const resultado = await database(tableName)
        .insert(mensajeNuevo)
        res.send({...mensajeNuevo, id: resultado[0]})
    } catch (err) {
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    const body = req.body
    id = parseInt(req.params.id)
    try {
        const mensajeNuevo = {
            email: body.email,
            mensaje: body.mensaje
        }
        const resultado = await database(tableName)
        .where({id: id})
        .update(mensajeNuevo)
        res.send({mensajeNuevo, id: resultado})
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id", async (req, res) => {
    id = req.params.id
    const resultado = await database(tableName)
    .where({id: +id})
    .del()
    res.send("mensaje eliminado")
})

module.exports = router