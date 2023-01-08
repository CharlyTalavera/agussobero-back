const { fork } = require("child_process")

const generadorRandoms = (req, res)=> {
    const child = fork("./utils/generadorNumeros")
    child.send(req.query.cant || 1e8)
    child.on("message", resultado => {
        return res.send(resultado)
    })
}

module.exports = generadorRandoms