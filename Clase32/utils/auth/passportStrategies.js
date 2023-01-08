const User = require("../../dataBases/mongoDb/schemas/userSchema")
const { hashPassword, comparePassword } = require("./bcrypt")

const loginStrategy = (async (username, password, done)=>{
    try {
        const user = await User.findOne({username})
        if(!user || !comparePassword(user, password)) {
            return done(null, false, {mensaje: "error en los datos"})
        } else {
            return done(null, user)
        }
    } catch (err) {
        done(err)
    }
})

const signUpStrategy = (async (req, username, password, done)=>{
    const user = await User.findOne({username})
    if (user) {
        return done(null, false, {mensaje: "Usuario ya Registrado"})
    }
    const hashedPassword = hashPassword(password)
    const newUser = new User({
        username,
        password: hashedPassword
    })
    await newUser.save()
    return done(null, newUser)
})

module.exports = {
    loginStrategy,
    signUpStrategy
}