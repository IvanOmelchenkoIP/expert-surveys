'use strict';

const express = require("express");
const mysql = require("mysql2");

const app = express();
const json = express.json();

const connectionOptions = {
  host: "localhost",
  user: "root",
  password: "io25112002O",
  database: "expertsurveys",
};

const connection = mysql.createConnection(connectionOptions);

app.get('/api/getexperts', function (req, res) {
  const sql = `SELECT * FROM Expert`;

  connection.connect(function (err) {
    if (err) throw err;

    connection.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  })
});

app.get('/api/getexpert/:expertid', function (req, res) {
  const sql = `SELECT * FROM Expert WHERE id = ${req.params.expertid}`;

  connection.connect(function (err) {
    if (err) throw err;

    connection.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  })
});

app.post('/api/addexpert/', json, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `INSERT INTO Expert (id, job, User_id) VALUES (${req.body.id}, \"${req.body.job}\", ${req.body.User_id})`;

  connection.connect(function (err) {
    if (err) throw err;

    connection.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  })
});

app.put('/api/updateexperts/:expertid', json, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `UPDATE Experts SET job = \"${req.body.job}\", User_id = ${req.body.User_id} WHERE id = ${req.params.expertid}`

  connection.connect(function (err) {
    if (err) throw err;

    connection.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  })
});

app.delete('/api/deleteexpert/:expertid', function (req, res) {
  const sql = `DELETE FROM Expert WHERE id = ${req.params.expertid}`;

  connection.connect(function (err) {
    if (err) throw err;

    connection.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  })
});

const port = 3000;
app.listen(port);