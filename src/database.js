const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://portocreator:pasodelcaballo2@libreriaporto.ixmod.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log('conectado a la db'))
