const { Request, Response } = require("express");

const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

const dbQuery = (query, params, key, callback) => {
  pool.query(query, params, (error, results) => {
    if (error) {
      callback(error);
      return;
    }

    callback(null, results);
  });
};