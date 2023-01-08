process.on("message", (cant)=>{
    const resultado = generadorNumeros(cant)
    process.send(resultado)
})

function generadorNumeros (cant) {
    const numeros = {}
    for(let i=0; i<cant; i++) {
        let _resultado = Math.ceil(Math.random() * 1000)
        if (!numeros[_resultado]) {
            numeros[_resultado] = 1
        } else {
            numeros[_resultado]++
        }
    }
    return numeros
} 

module.exports = generadorNumeros