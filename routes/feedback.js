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
      "SELECT * FROM FEEDBACK",

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
router.get("/porId/:id_feedback", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM FEEDBACK WHERE id_feedback = ?",

      [req.params.id_feedback],

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
      "INSERT INTO FEEDBACK (feedback)" + "values (?)",

      [req.body.feedback],

      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        res.status(201).send({
          mensagem: "Inserido com sucesso",
          id_feedback: resultado.insertId,
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
      "UPDATE FEEDBACK" +
        " SET  " +
        "feedback= ?" +
        "WHERE " +
        " id_feedback = ?",

      [req.body.feedback, req.body.id_feedback],

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
      "DELETE FROM FEEDBACK WHERE id_feedback = ?",
      [req.body.id_feedback],
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
