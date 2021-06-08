const express = require("express");
const morgan = require("morgan");
const bodyParse = require("body-parser");
const app = express();
const cors = require("cors");

const rotaTeste = require("./routes/teste")

const { request } = require("express");

app.use(morgan("dev"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// // Tratamento do CORS
app.use(cors());

app.use('/teste' , rotaTeste)

app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});
// Formatando exibição do JSON
app.set("json spaces", 4);

module.exports = app;
