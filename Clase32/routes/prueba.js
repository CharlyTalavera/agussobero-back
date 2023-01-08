const { Router } = require("express")
const router = Router()

router.get("/", (req, res)=>{
    res.send("si funciona")
})

module.exports = router