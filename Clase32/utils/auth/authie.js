function authie (req, res, next) {
        if (!req.isAuthenticated) {
            res.redirect("/login")
            return
        } else {
            next()
        }
}

module.exports = authie