const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const moment = require("moment");

// GET
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    const sql =
      "SELECT os, razao_social, cliente, endereco, evento, nome_evento," +
      " pedido_cliente, os_quantidade, pedido_de_saida ,dt_cadastro, dt_update" +
      " FROM ordem_servico_liberacao;";

    conn.query(sql, (error, result, fields) => {
      conn.release();

      if (error) {
        return res.status(500).send({ error: error });
      }

      const response = {
        itens: result,
      };

      return res.send(response);
    });
  });
});

// GET COM ID ESPECIFICO
router.get("/v1/os/:id_os", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    const id = parseInt(req.params.id_os);

    console.log(id);

    const sql =
      "SELECT os, razao_social, cliente, endereco, evento, nome_evento," +
      " pedido_cliente, os_quantidade, pedido_de_saida ,dt_cadastro, dt_update" +
      " FROM heroku_dd1fcca5d8ee5f1.ordem_servico_liberacao" +
      " where OS = ?";

    conn.query(sql, id, (error, result, fields) => {
      conn.release();

      if (error) {
        return res.status(500).send({ error: error });
      }

      if (result.length == 0) {
        return res.status(404).send({
          mensagem: "nao foi encontrado OS com esse número",
        });
      }

      return res.status(200).json({
        quantidade: result.length,
        itens: result,
      });
    });
  });
});

// POST V1
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    const records = [
      [
        46905,
        "ALL SERVICE",
        "PREZADOS",
        "RUA SENA MADUREIRA ,1070",
        "CHAMADO 10146- DESKTOP I3 4GB",
        "CHAMADO 10146- DESKTOP I3 4GB",
        48,
        "KIT I3 4GB",
        "2021-05-06",
        "2916 | 86085",
        "MONITOR 19.5",
        "MONITOR 19.5 LED AOC WIDE E2070SWN",
        "2021-05-31",
      ],
      [
        46906,
        "ALL SERVICE",
        "PREZADOS",
        "RUA SENA MADUREIRA ,1070",
        "CHAMADO 10146- DESKTOP I3 4GB",
        "CHAMADO 10146- DESKTOP I3 4GB",
        48,
        "KIT I3 4GB",
        "2021-05-06",
        "2916 | 86085",
        "MONITOR 19.5",
        "MONITOR 19.5 LED AOC WIDE E2070SWN",
        "2021-05-31",
      ],
    ];

    req.body.dt_cadastro = moment().format("yyyy-MM-DD");

    const recordsBody = [
      [
        req.body.os,
        req.body.razao_social,
        req.body.cliente,
        req.body.endereco,
        req.body.evento,
        req.body.nome_evento,
        req.body.os_quantidade,
        req.body.pedido_cliente,
        req.body.pedido_de_saida,
        req.body.modelo,
        req.body.dt_cadastro,
      ],
    ];
    let arrayNovo = [];

    for (let index = 0; index < recordsBody.length; index++) {
      arrayNovo.push(recordsBody[index]);
    }

    console.log(arrayNovo);

    const sql =
      "INSERT INTO ordem_servico_liberacao (os, razao_social, cliente, endereco, evento, nome_evento, os_quantidade, pedido_cliente, pedido_de_saida, modelo,dt_cadastro)" +
      " VALUES ?";

    conn.query(sql, [arrayNovo], (error, resultado, field) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      res.status(201).send({
        mensagem: "Inserido com sucesso",
        id: resultado.insertId,
      });
    });
  });
});

module.exports = router;
