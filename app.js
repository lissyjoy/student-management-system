const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', /* MySQL User */
  password: '', /* MySQL Password */
  database: 'sms' /* MySQL Database */
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected with App...');
});

/**
 * Get All Items
 *
 * @return response()
 */
app.get('/api/students', (req, res) => {
  let sqlQuery = "SELECT * FROM student";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/edit-student/:id', (req, res) => {
  let sqlQuery = "SELECT * FROM student WHERE id=" + req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/add-student', (req, res) => {
  let data = { firstname: req.body.firstname, lastname: req.body.lastname, dob: req.body.dob, education: req.body.education, email: req.body.email, location: req.body.location, about: req.body.about, };
  let sqlQuery = "INSERT INTO student SET ?";
  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/update-student/:id', (req, res) => {
  let sqlQuery = "UPDATE student SET firstname='" + req.body.firstname + "', lastname='" + req.body.lastname + "', dob='" + req.body.dob + "', education='" + req.body.education + "', email='" + req.body.email + "', location='" + req.body.location + "', about='" + req.body.about + "' WHERE id=" + req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/delete-student/:id', (req, res) => {
  let sqlQuery = "DELETE FROM student WHERE id=" + req.params.id + "";
  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({ "status": 200, "error": null, "response": results });
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3002, () => {
  console.log('Server started on port 3002...');
});