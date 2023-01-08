const bcrypt = require("bcrypt")

const hashPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const comparePassword = (user, password)=>{
    return bcrypt.compareSync(password, user.password)
}

module.exports = {
    hashPassword,
    comparePassword
}