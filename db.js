const mongoose=require('mongoose') 
require('dotenv').config() 
const {DB_HOST, DB_PORT}=process.env 
mongoose.connect('mongodb://'+DB_HOST+':'+DB_PORT+'/Obrazki', {useNewUrlParser: true, useUnifiedTopology: true}) 
.then(console.log('Baza danych dziala!')) 
.catch(err=>console.log(err)) 