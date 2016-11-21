var express =  require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

//GET the tasks
router.get('/', function(req, res) {
  console.log('get request');
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT name, description, pic FROM treats;', function(err, result) {
      done();

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }

      res.send(result.rows);

    });

  });
});

//POST the tasks to database
router.post('/', function(req, res) {
  var newTreat = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3)',
      [newTreat.name, newTreat.description, newTreat.url],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });

});

router.get('/:query', function(req, res) {
  queryID = req.params.query;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT name, description, pic FROM treats WHERE name ILIKE $1;', [queryID], function(err, result) {
      done();

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      //console.log("results.rows", result.rows);
      res.send(result.rows);

    });

  });
});




module.exports = router;
