const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// GET
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "select * from item i",

      (error, resultado, fields) => {
        conn.release();

        if (error) {
          return res.status(500).send({ error: error });
        }

        return res.status(200).send(resultado);
      }
    );
  });
});

// GET COM ID ESPECIFICO
router.get("/v1/os/:id_os", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "select * from item i where os = ?",

      [req.params.id_os],

      (error, resultado, fields) => {
        conn.release();

        if (error) {
          return res.status(500).send({ error: error });
        }

        return res.status(200).send(resultado);
      }
    );
  });
});

// POST
router.post("/item", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    const mockRecords = [
      [
        46085,
        "2021-03-09 00:00:00",
        "12912 | 97117 ",
        "NOBREAK 600VA",
        "NOBREAK MCM UPS 600VA STD TI PRETO",
        "2021-05-31 00:00:00",
      ],
      [
        46086,
        "2021-03-09 00:00:00",
        "12912 | 97117 ",
        "NOBREAK 600VA",
        "NOBREAK MCM UPS 600VA STD TI PRETO",
        "2021-05-31 00:00:00",
      ],
    ];


    let bodyRecords = [
      
       [ req.body.os,
        req.body.dt_saida,
        req.body.patrimonio,
        req.body.descricao,
        req.body.modelo,
        req.body.dt_cadastro,
       ]
      ,
    ];

    console.log(bodyRecords);

    console.log("-----------------------------");

    let arrayNovo = [];

    for (let index = 0; index < bodyRecords.length; index++) {
      arrayNovo.push(bodyRecords);
    }

    console.log(bodyRecords);

    const sql =
      "INSERT into item (os, dt_saida, patrimonio, descricao, modelo, dt_cadastro) values ?";

    conn.query(sql, arrayNovo, (error, resultado, field) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      res.status(201).send({
        mensagem: "Inserido com sucesso",
        id_feedback: resultado.insertId,
      });
    });
  });
});

module.exports = router;
