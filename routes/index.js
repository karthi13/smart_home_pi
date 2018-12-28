var express = require('express');
var firebaseStore = require('../src/Database/send-environment-data');
var { ChangeHSAPIPlugStatus } = require('../src/ReadSensor/environment-sensor');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hsapi',function(req, res, next){

  console.log(req.query, "Status defined");
  firebaseStore.firebaseWriteHSPlugData(req.query.plugStatus);
  ChangeHSAPIPlugStatus(req.query.plugStatus);
  res.status(200).send({plugStatus: req.query.plugStatus});

});

module.exports = router;
