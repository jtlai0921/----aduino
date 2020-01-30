var DHT11 = require('./models/dht11');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  DHT11.find().select('-_id -__v').sort({'時間': -1})
       .limit(10)
       .exec(function(err, data) {
         res.render('table', {docs:data});
       });
});

app.listen(5438);