const mongoose=require('mongoose') //We initialize the database. "Mongoose" is... a framework for MongoDB 
require('dotenv').config() 
const {DB_HOST, DB_PORT}=process.env 
mongoose.connect('mongodb://'+DB_HOST+':'+DB_PORT+'/Obrazki', {useNewUrlParser: true, useUnifiedTopology: true}) 
.then(console.log('Baza danych dziala!')) 
.catch(err=>console.log(err)) 