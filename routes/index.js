const { Router } = require("express")
const router = Router()

router.use('/contact', require('./contact.router'));


module.exports = router