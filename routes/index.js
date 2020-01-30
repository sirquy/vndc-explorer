var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:offset?', function(req, res, next) {
  var db = req.app.get('db');
  if (!req.params.offset) {
    req.params.offset = 0;
  } else {
    req.params.offset = parseInt(req.params.offset);
  }
  db.find({}).sort({ timestamp: -1 }).skip(req.params.offset).limit(100).exec(function (err, events) {    
    res.render('index', { events: events, offset: req.params.offset, stepSize: 100 });
  });

});

module.exports = router;
