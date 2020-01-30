var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensors');
var dht11Schema = new mongoose.Schema({
    '溫度': Number,
    '濕度': Number,
    '時間': { type: Date, default: Date.now }
});
var DHT11 = mongoose.model('dht11', dht11Schema);
module.exports = DHT11;