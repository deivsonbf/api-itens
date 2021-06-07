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
      "SELECT * FROM USUARIOS",

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
router.get("/porId/:id_usuario", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM USUARIOS WHERE id_usuario = ?",

      [req.params.id_usuario],

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
      "INSERT INTO USUARIOS (nome , cpf) values (?,?)",

      [
        req.body.nome,
        req.body.cpf
      ],

      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        res.status(201).send({
          mensagem: "Inserido com sucesso",
          id_usuario: resultado.insertId,
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
      "UPDATE USUARIOS SET nome = ?, cpf = ? WHERE id_usuario = ?",
      [ req.body.nome, 
        req.body.cpf, 
        req.body.id_usuario
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
      "DELETE FROM USUARIOS WHERE id_usuario = ?",
      [req.body.id_usuario],
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
