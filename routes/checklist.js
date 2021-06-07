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
      "SELECT * FROM CHECKLIST",

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
router.get("/porId/:id_checklist", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM CHECKLIST WHERE id_checklist = ?",

      [req.params.id_checklist],

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
      "INSERT INTO CHECKLIST (cliente ,email ,razao_social ,endereco , telefone ,os , dt_montagem , dt_desmontagem , equipamento " +
        ",motorista ,veiculo ,situacao ,diesel ,horimetro_hora ,horimentro_minutos ,img_logo ,img_foto1 ,img_foto2 , img_foto3 ,img_foto4 " +
        ",img_foto5 ,img_foto6 ,img_foto7 ,img_foto8 ,img_foto9 ,img_foto10 , img_foto11 , img_foto12 , img_foto13 , img_foto14 , img_foto15 , img_foto16" +
        ",img_foto17 , img_foto18 , item_extra1 , item_extra2 , item_extra3 , item_extra4 , item_extra5 , checklist_item1 ,checklist_item2 ,checklist_item3" +
        ",checklist_item4 ,checklist_item5 ,checklist_item6 , checklist_item7 ,checklist_item8 ,checklist_item9 ,checklist_item10 ,checklist_item11 ,checklist_item12 " +
        ",checklist_item13 ,checklist_item14 ,checklist_item15 ,checklist_item16 ,checklist_item17 ,checklist_item18 ,checklist_item19 ,checklist_item20 ,observacao " +
        ",responsavel_cpf , img_signature)" +
        "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?)",

      [
        req.body.cliente,
        req.body.email,
        req.body.razao_social,
        req.body.endereco,
        req.body.telefone,
        req.body.os,
        req.body.dt_montagem,
        req.body.dt_desmontagem,
        req.body.equipamento,
        req.body.motorista,
        req.body.veiculo,
        req.body.situacao,
        req.body.diesel,
        req.body.horimetro_hora,
        req.body.horimentro_minutos,
        req.body.img_logo,
        req.body.img_foto1,
        req.body.img_foto2,
        req.body.img_foto3,
        req.body.img_foto4,
        req.body.img_foto5,
        req.body.img_foto6,
        req.body.img_foto7,
        req.body.img_foto8,
        req.body.img_foto9,
        req.body.img_foto10,
        req.body.img_foto11,
        req.body.img_foto12,
        req.body.img_foto13,
        req.body.img_foto14,
        req.body.img_foto15,
        req.body.img_foto16,
        req.body.img_foto17,
        req.body.img_foto18,
        req.body.item_extra1,
        req.body.item_extra2,
        req.body.item_extra3,
        req.body.item_extra4,
        req.body.item_extra5,
        req.body.checklist_item1,
        req.body.checklist_item2,
        req.body.checklist_item3,
        req.body.checklist_item4,
        req.body.checklist_item5,
        req.body.checklist_item6,
        req.body.checklist_item7,
        req.body.checklist_item8,
        req.body.checklist_item9,
        req.body.checklist_item10,
        req.body.checklist_item11,
        req.body.checklist_item12,
        req.body.checklist_item13,
        req.body.checklist_item14,
        req.body.checklist_item15,
        req.body.checklist_item16,
        req.body.checklist_item17,
        req.body.checklist_item18,
        req.body.checklist_item19,
        req.body.checklist_item20,
        req.body.observacao,
        req.body.responsavel_cpf,
        req.body.img_signature,
      ],

      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        res.status(201).send({
          mensagem: "Inserido com sucesso",
          id_checklist: resultado.insertId,
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
      "UPDATE CHECKLIST" +
        " SET  " +
        "cliente= ?, email= ?, razao_social= ?, endereco= ?, telefone= ?, os= ?, dt_montagem= ?, dt_desmontagem= ?, " +
        "equipamento= ?, motorista= ?, veiculo= ?, situacao= ?, diesel= ?, horimetro_hora= ?, horimentro_minutos= ?, " +
        "img_logo= ?, img_foto1= ?, img_foto2= ?, img_foto3= ?, img_foto4= ?, img_foto5= ?, img_foto6= ?, img_foto7= ?, " +
        "img_foto8= ?, img_foto9= ?, img_foto10= ?, img_foto11= ?, img_foto12= ?, img_foto13= ?, img_foto14= ?, " +
        "img_foto15= ?, img_foto16= ?, img_foto17= ?, img_foto18= ?, item_extra1= ?, item_extra2= ?, item_extra3= ?," +
        "item_extra4= ?, item_extra5= ?, checklist_item1= ?, checklist_item2= ?, checklist_item3= ?, checklist_item4= ?," +
        "checklist_item5= ?, checklist_item6= ?, checklist_item7= ?, checklist_item8= ?, checklist_item9= ?,checklist_item10= ?," +
        "checklist_item11= ?, checklist_item12= ?, checklist_item13= ?, checklist_item14= ?, checklist_item15= ?, checklist_item16= ?," +
        "checklist_item17= ?, checklist_item18= ?, checklist_item19= ?, checklist_item20= ?, observacao= ?, responsavel_cpf= ?," +
        "img_signature = ? " +
        "WHERE " +
        " id_checklist = ?",

      [
        req.body.cliente,
        req.body.email,
        req.body.razao_social,
        req.body.endereco,
        req.body.telefone,
        req.body.os,
        req.body.dt_montagem,
        req.body.dt_desmontagem,
        req.body.equipamento,
        req.body.motorista,
        req.body.veiculo,
        req.body.situacao,
        req.body.diesel,
        req.body.horimetro_hora,
        req.body.horimentro_minutos,
        req.body.img_logo,
        req.body.img_foto1,
        req.body.img_foto2,
        req.body.img_foto3,
        req.body.img_foto4,
        req.body.img_foto5,
        req.body.img_foto6,
        req.body.img_foto7,
        req.body.img_foto8,
        req.body.img_foto9,
        req.body.img_foto10,
        req.body.img_foto11,
        req.body.img_foto12,
        req.body.img_foto13,
        req.body.img_foto14,
        req.body.img_foto15,
        req.body.img_foto16,
        req.body.img_foto17,
        req.body.img_foto18,
        req.body.item_extra1,
        req.body.item_extra2,
        req.body.item_extra3,
        req.body.item_extra4,
        req.body.item_extra5,
        req.body.checklist_item1,
        req.body.checklist_item2,
        req.body.checklist_item3,
        req.body.checklist_item4,
        req.body.checklist_item5,
        req.body.checklist_item6,
        req.body.checklist_item7,
        req.body.checklist_item8,
        req.body.checklist_item9,
        req.body.checklist_item10,
        req.body.checklist_item11,
        req.body.checklist_item12,
        req.body.checklist_item13,
        req.body.checklist_item14,
        req.body.checklist_item15,
        req.body.checklist_item16,
        req.body.checklist_item17,
        req.body.checklist_item18,
        req.body.checklist_item19,
        req.body.checklist_item20,
        req.body.observacao,
        req.body.responsavel_cpf,
        req.body.img_signature,
        req.body.id_checklist,
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
      "DELETE FROM CHECKLIST WHERE id_checklist = ?",
      [req.body.id_checklist],
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
