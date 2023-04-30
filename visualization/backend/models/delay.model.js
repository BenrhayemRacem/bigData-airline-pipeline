const mongoose = require('mongoose') ;

const delaySchema = new mongoose.Schema({
    date : String,
    origin: String ,
    destination :String ,
    flight : String ,
    delay : Number

})

const delay = mongoose.model('delay' , delaySchema ,'delay');
delay.watch().on('change' , data =>console.log(data))
module.exports = delay