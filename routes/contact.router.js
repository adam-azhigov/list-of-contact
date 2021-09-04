const { Router } = require('express')
const { contactController } = require("../controllers/contact.controller")
const router =  Router()


router.get("/", contactController.getContacts)
router.post("/post", contactController.createContact)
router.patch("/edit/:id", contactController.editContact)
router.delete("/delete/:id", contactController.deleteContact)

module.exports = router