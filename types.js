const mongoose=require('mongoose') 
const {Schema}=mongoose 

const schemaone=new Schema({ 
    name: String, 
    image: { 
        data: Buffer, 
        contentType: String 
    }
}) 

const Obrazek=mongoose.model('paint', schemaone) 

module.exports=Obrazek 