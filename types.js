const mongoose=require('mongoose') 
const {Schema}=mongoose 

const schemaone=new Schema({ //Creating a pattern for future ojects in collection (some sort of table in a way) 
    name: String, 
    image: { 
        data: Buffer, 
        contentType: String 
    }
}) 

const Obrazek=mongoose.model('paint', schemaone) //"Obrazek"="paint" in English. Creating entire collection where "brazek" is an object/file (equivaent of verse) in it. 

module.exports=Obrazek 