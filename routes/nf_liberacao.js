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
      "SELECT * FROM NF_LIBERACAO",

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

// GET COM ID ESPECIFICO
router.get("/porId/:id_nf_liberacao", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM NF_LIBERACAO WHERE ID_NF_LIBERACAO = ?",

      [req.params.id_nf_liberacao],

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

// POST
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "INSERT INTO NF_LIBERACAO (nro_os , nro_nf , manifesto , nro_manifesto ," +
        "nome_funcionario , cpf_funcionario ,  data , dt_cadastro) values (?,?,?,?,?,?,?,(now()))",
      [
        req.body.nro_os,
        req.body.nro_nf,
        req.body.manifesto,
        req.body.nro_manifesto,
        req.body.nome_funcionario,
        req.body.cpf_funcionario,
        req.body.data,
      ],

      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        res.status(201).send({
          mensagem: "Inserido com sucesso",
          id_nf_liberacao: resultado.insertId,
        });
      }
    );
  });
});

// PUT
router.put("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "UPDATE NF_LIBERACAO SET nro_os = ?, nro_nf = ?, manifesto=?, nro_manifesto = ?," +
        " nome_funcionario = ? , cpf_funcionario=? , data = ?, dt_cadastro=(now()) , dt_update = (now()) " +
        " WHERE id_nf_liberacao = ?",
      [
        req.body.nro_os,
        req.body.nro_nf,
        req.body.manifesto,
        req.body.nro_manifesto,
        req.body.nome_funcionario,
        req.body.cpf_funcionario,
        req.body.data,
        req.body.id_nf_liberacao,
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

// DELETE
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "DELETE FROM NF_LIBERACAO WHERE id_nf_liberacao = ?",
      [req.body.id_nf_liberacao],
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
