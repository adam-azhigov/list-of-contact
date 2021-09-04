const  Contact = require('../models/Contact.model')

module.exports.contactController = {
   getContacts: async (req,res) => {
     try{
        const contact = await Contact.find()
       return res.json(contact)

     } catch (e) {
       console.log(e.message)
     }
},

  createContact: async (req,res) => {
     try {
       const { name } = req.body;
       const newContact  =  await Contact.create({ name})
       return  res.status(200).json(newContact)
     } catch (e) {
       console.log(e.message)
     }
  },

  deleteContact: async (req,res) => {
     try{
       const { id } = req.params
       const contact = await Contact.findByIdAndDelete(id)
       return  res.json("удалено")
     }catch (e) {
       console.log(e.message)
     }
  },
  editContact: async (req,res) => {
     try{
       const { id } = req.params
       const { name } = req.body
       const contact = await Contact.findByIdAndUpdate(id, {name})
       return res.json(contact)
     }catch (e){
       console.log(e.message)
     }
  }

}