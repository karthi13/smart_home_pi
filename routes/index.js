var express = require('express');
var firebaseStore = require('../src/Database/send-environment-data');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hsapi',function(req, res, next){

  console.log(req.query, "Status defined");
  firebaseStore.firebaseWriteHSPlugData(req.query.plugStatus);
  res.send("Hello")
});

module.exports = router;
