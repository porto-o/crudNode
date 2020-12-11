const { Schema, model } = require("mongoose")

const BookSchema = Schema({
  nombre: String,
  edicion: String,
  autor: String,
  datePub: String,
  editorial: String

})

module.exports = model('Book', BookSchema)
