const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const productoRoutes = require("./routes/productos")
const mensajeRoutes = require("./routes/mensajes")
const Contenedor = require ("./utils/contenedorProducto")
const productos = new Contenedor("./productos.json")
const mensajes = new Contenedor("./mensajes.json")
const { urlencoded } = require("express")

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/productos", productoRoutes)
app.use("/api/mensajes", mensajeRoutes)

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)

app.get("/", (req, res) => {
    res.sendFile(__dirname + ("/public/index.html"))
})

socketServer.on("connection", async (socket) =>{
        console.log("nuevo cliente conectado")

        socket.emit("productosRegistrados", await productos.getAll())

    socket.on("productoNuevo", async (producto) =>{
        await productos.save(producto)
        
        socket.emit("productosRegistrados", productos.getAll())
    })

//Mensajes

    socket.emit("mensajesRegistrados", await mensajes.getAll())

    socket.on("mensajeNuevo", async (mensaje) => {
        await mensajes.save(mensaje)

        socket.emit("mensajesRegistrados", mensajes.getAll())
    })
})

const PORT = process.env.PORT || 3000
httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})