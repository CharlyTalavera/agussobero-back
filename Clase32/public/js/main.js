const socket = io()

socket.on("connect", ()=> {
    console.log("Conectado al servidor")
})

/* const dataMensajes = require("./dataBases/posts.json") */

//Productos
/* const ingresoProducto = document.getElementById("ingresarProducto")

ingresoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const productoNuevo = {
        nombre: ingresoProducto.children.nombre.value,
        precio: ingresoProducto.children.precio.value,
        thumbnail: ingresoProducto.children.thumbnail.value,
    }
    socket.emit("productoNuevo", (productoNuevo))
    ingresoProducto.reset()
}) */

/* socket.on("productosRegistrados", (productos) => {
    prodTable(productos).then((html) => {
        document.getElementById("productos").innerHTML = html
    })
}) */

socket.on("testProductos", (testProductos) =>{
    prodTable(testProductos).then((html) => {
        document.getElementById("productosTest").innerHTML = html
    })

    socket.on("productosRegistrados", testProductos)
})

const prodTable = async (_testProductos) => {
    const res = await fetch ("../productos.hbs")
    const view = await res.text()
    const template = Handlebars.compile(view)
    const html = template ({producto: _testProductos})
    return html
}

//Mensajes

const email = document.getElementById("email")
const mensaje = document.getElementById("mensaje")
const enviarMensaje = document.getElementById("enviarMensaje")

const ingresoMensaje = document.getElementById("ingresarMensaje")

socket.on("mensajesNormalizados", async (mensajesNorm) => {
    const html = await mensaTable(mensajesNorm)
    document.getElementById("mensajes").innerHTML = html
})

/* const mensaTable = async (_mensajes) => {
    const res = await fetch ("../mensajes.hbs")
    const view = await res.text()
    const template = Handlebars.compile(view)
    const html = template ({mensaje: _mensajes})
    return html
} */


ingresoMensaje.addEventListener("enviarMensaje", (e) => {
    e.preventDefault();
    const mensaje = {
        author: {
            email: ingresoMensaje.children.email.value,
            nombre: ingresoMensaje.children.nombre.value,
            apellido: ingresoMensaje.children.apellido.value,
            edad: ingresoMensaje.children.edad.value,
            alias: ingresoMensaje.children.alias.value,
            avatar: ingresoMensaje.children.avatar.value
        },
        comment: ingresoMensaje.children.mensaje.value
    }
    socket.emit("mensajePost", mensaje)
    ingresoMensaje.reset()
})

socket.on("mensajeRegistrado", (mensaje) => {
    const html = mensajesListHtml(mensaje)
    document.getElementById("mensajesChat").innerHTML = html
})

function mensajesListHtml (mensajes) {
    return mensajes.map((mensaje) => {
        return (
            `
            <div>
                <b>Usuario: ${mensaje.author}</b>
                <b>Mensaje: ${mensaje.comment}</b>
                
            </div>
            `
        )
    }).join(" ");
}




