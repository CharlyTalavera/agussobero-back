const { Router } = require("express")
const router = Router()
const generadorRandoms = require("../utils/childProcess")

router.get("/", generadorRandoms)

module.exports = router