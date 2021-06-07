const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// SELECT TUDO VIA GET
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM MANUTENCAO",

      (error, resultado, fields) => {
        conn.release();

        if (error) {
          return res.status(500).send({ error: error });
        }

        return res.status(200).send({
          response: resultado,
        });
      }
    );
  });
});

// SELECT VIA GET COM ID ESPECIFICO
router.get("/porId/:id_manutencao", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM MANUTENCAO WHERE id_manutencao = ?",

      [req.params.id_manutencao],

      (error, resultado, fields) => {
        conn.release();

        if (error) {
          return res.status(500).send({ error: error });
        }

        return res.status(200).send({
          response: resultado,
        });
      }
    );
  });
});

// INSERT VIA METODO POST
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "INSERT INTO manutencao (patrimonio_gerador,modelo," +
        "potencia,horimetro,defeitos_causas,nome_funcionario," +
        "cpf_funcionario,descricao_servicos) values (?,?,?,?,?,?,?,?)",

      [
        req.body.patrimonio_gerador,
        req.body.modelo,
        req.body.potencia,
        req.body.horimetro,
        req.body.defeitos_causas,
        req.body.nome_funcionario,
        req.body.cpf_funcionario,
        req.body.descricao_servicos,
      ],

      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        res.status(201).send({
          mensagem: "Inserido com sucesso",
          id_manutencao: resultado.insertId,
        });
      }
    );
  });
});

// ALTERA VIA METODO PUT
router.put("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "UPDATE MANUTENCAO SET patrimonio_gerador = ? ,modelo = ?, potencia = ? ," +
        "horimetro = ? ,defeitos_causas = ? , nome_funcionario = ?, cpf_funcionario = ?, " +
        "descricao_servicos = ? WHERE id_manutencao = ?",
      [
        req.body.patrimonio_gerador,
        req.body.modelo,
        req.body.potencia,
        req.body.horimetro,
        req.body.defeitos_causas,
        req.body.nome_funcionario,
        req.body.cpf_funcionario,
        req.body.descricao_servicos,
        req.body.id_manutencao,
      ],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({ error: error });
        }

        res.status(202).send({
          mensagem: "alterado com sucesso",
        });
      }
    );
  });
});

// EXCLUI VIA METODO DELETE
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "DELETE FROM MANUTENCAO WHERE id_manutencao = ?",
      [req.body.id_manutencao],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({ error: error });
        }

        res.status(202).send({
          mensagem: "deletado com sucesso",
        });
      }
    );
  });
});

module.exports = router;
