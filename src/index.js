const express = require("express");
const app = express();
//const port = 4000;
const cors = require("cors"); //npm i cors

require("./database"); // npm i mongoose
const Book = require("./model/Book");

//app.use(fileUpload())
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/book", async (req, res) => {
  let books = await Book.find();
  res.json(books);
});

app.post("/book", async (req, res) => {
  const { nombre, edicion, autor, datePub, editorial } = req.body;
  if(nombre === "" || edicion === "" || autor === "" || datePub === "" || editorial===""){
    res.json({msg:"no valido"});
  }else {
    const book = new Book({nombre, edicion, autor, datePub, editorial});
    await book.save();
    res.json({msg: "libro agregado"});
  }
});

app.delete("/book/:id", async (req, res) => {
  const { id } = req.params;
  await Book.deleteOne({ _id: id });
  res.json({ msg: "libro eliminado" });
});

app.get("/book/:nombreBuscar", async (req, res) => {
  const { nombreBuscar } = req.params;

  let books = await Book.find({
    nombre: new RegExp("^" + nombreBuscar + "$", "i")
  });
  res.json(books);

});

app.get("/autor/:autorBuscar", async (req, res) => {
  const { autorBuscar } = req.params;
  let books = await Book.find({
    autor: new RegExp("^" + autorBuscar + "$", "i")

  });
  res.json(books);
});

app.get("/fecha/:fechaBuscar", async (req, res) => {
  const { fechaBuscar } = req.params;
  let books = await Book.find({
    datePub: new RegExp("^" + fechaBuscar + "$", "i")

  });
  res.json(books);
});


app.get("/book/obtener/:id", async (req, res) => {
  const { id } = req.params;
  let books = await Book.findOne({ _id: id });
  res.json(books);
});

app.put("/book", async (req, res) => {
  const { id, nombre, edicion, autor, datePub, editorial } = req.body;
  await Book.updateOne(
    { _id: id },
    { $set: { nombre, edicion, autor, datePub, editorial } }
  );
  res.json({ msg: "libro actualizado" });
});

