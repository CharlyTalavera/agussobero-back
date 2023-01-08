const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const args = require("yargs")(process.argv.slice(2))
        .alias({
            p: "port",
            m: "mode"
        })
        .default({
            port: 8080,
            mode: "fork"
        })
        .argv

const DATABASE_CLUSTER= process.env.DATABASE_CLUSTER
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_CLI = process.env.DATABASE_CLI
const PORT = args.port
const MODE = args.mode

connection = async () => {
    const URIString = "mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/process?retryWrites=true&w=majority"
    /* const URIString = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.7znzdl8.mongodb.net/process?retryWrites=true&w=majority` */
    try{
        await mongoose.connect(URIString)
        console.log("Conectado a MongoDb")
    } catch(err) {
        console.log(err)
    }
}

connection() 

module.exports = {
    connection,
    DATABASE_CLUSTER,
    DATABASE_USER,
    DATABASE_NAME,
    PORT,
    MODE
}
