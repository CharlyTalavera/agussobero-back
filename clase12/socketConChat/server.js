/* const { application } = require("express")  */
const express = require ("express")
const {Server: HTTPServer} = require ("http")
const {Server: SocketServer} = require ("socket.io")
const events = require("./socket_events")
const Contenedor = require ("./utils/contenedor")
const contenedor = new Contenedor("./data.json")


const messages = contenedor.getAll()

const app = express()
const httpServer = new HTTPServer (app)
const socketServer = new SocketServer (httpServer)

app.use(express.static("public"))

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
})

socketServer.on("connection", (socket) =>{
    console.log(`nuevo cliente conectado`)
    socketServer.emit(events.UPDATE_MESSAGES, "Bienvenido al Socket", messages);

    socket.on(events.POST_MESSAGE, (msg) => {
        const _msg = {...msg, socket_id: socket.id, likes: 0, date: Date.now().toLocaleString()}
        contenedor.save(_msg)
        console.log(_msg)
        socketServer.sockets.emit(events.NEW_MESSAGE, (_msg))
    })

    socket.on(events.LIKE_MESSAGE, (msgId) => {
        const msg = contenedor.getById(msgId)
        msg.likes++
        contenedor.updateById(msgId, msg)
        socketServer.sockets.emit(events.UPDATE_MESSAGES, "Los mensajes se actualizaron", contenedor.getAll())
    })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
})