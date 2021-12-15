//MAIN APPLICATION OF SERVER 
const app=require('express')() //Two things are required for an application to exist in Express.js. The first is this request (something like an import). 
const cors=require('cors') //React.js by its nature does not trust "foreign" data sources. We're making an API here, right? We use links other than react's (for client / react, it will be "http: // localhost: 3000" and here is ": 5000"). You have to use "cors" for this to work. 
require('dotenv').config()  //Loading the library that allows the existence of the .env file (which has been removed in this statement). Below is why it is necessary. 
require('./db') //This notation means that you are actually creating a "copy" of the file at this point 
const bodyParser=require('body-parser')
//const type=require('./types') 
const Obrazek=require('./types')
const { runInNewContext } = require('vm') //Donna know why it's here. That has pasted byself I guess :O 
const fs=require('fs') 
const multer=require('multer') //Link :D 
const path=require('path')
const storage=multer.diskStorage({ 
    destination: (re, file, cb)=>{ 
        cb(null, 'Images') 
    }, 
    filename: (req, file, cb)=>{ 
        cb(null, Date.now()+path.extname(file.originalname)) 
        console.log(file) 
    }
}) 
const upload=multer({ 
    storage: storage, 
    limits: {fileSize: 1024 * 1024}, 
    fileFilter: (req, file, cb)=>{ 
        let valid=(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png') 
        cb(null, valid) 
    } 
})
//const {Obrazek}=type 
const {SERVER_PORT}=process.env //Destructuring. The object "process.env" (that is simply the contents of the ".env" peak) contains some elements. When recalling them, we would have to write continuously "process.env.SERVER_PORT" (or some other element of this object). At this moment it is enough to write "SERVER_PORT". This works for any number of object elements that we will be using. I might as well have written {SERVER_PORT, DB_PORT} = process.env" here. 
app.use(bodyParser.json()) //Parser. It allows you to separate the received elements. 
app.use(bodyParser.urlencoded({extended: true})) 

const corsOptions={ //Okay, but since the client accepts all data sources via the "cors" header, we have a problem. Let's make it accept data only from our server. 
    origin: 'http://localhost:3000', //Link of client 
    optionsSuccessStatus: 200 //Website status when everything is OK 
} 
app.use(cors(corsOptions)) //Each function that is in use can be written in two ways. One of them is the "use" method. 

app.get('/', (req, res)=>{ //Express has several basic methods. For example "get" or "post". "Get" is for cases like "You want to share something from the server". POST is necessairly when "You want to send something to the server, e.g. from a form". The fact that we refer to the "/" link does not mean that it will be visible in our main application. The full link was "http: // localhost: 5000 /". This is a link to the server's home page, not the client's. We can type it into the search engine, but we want to use the client. 
    res.send("ljhjyg") //"req" is used to handle incoming information. "res", in turn, is designed to send the reply. There is also a method for "res": "sendHTML". Have fun! :D 
}) 

app.post('/wstawianie', upload.single("zdjecie"), (req, res)=>{ //uploading; also with Link 
    console.log(req.file) 
    const img={ 
        data: fs.readFileSync(path.join(__dirname + '/Images/' + req.file.filename)), 
        contentType: req.file.mimetype  
    } 
    Obrazek.create({name: req.file.filename, image: img}) 
}) 
app.get('/usunwszystkie', (req, res)=>{ //This server-link will remove all photos from the gallery 
    Obrazek.deleteMany({}, (err)=>{ 
        if(err) return console.error(err) 
    }) 
}) 
app.get('/wyszukaj', (req, res)=>{ //Here we search for all the pictures that are in the gallery, and then send the names of these photos to the client-site. Why only names? This is the whole idea. If you send whole files, every time someone refreshes the page, there will be a huge data migration and somewhere in the world someone will shoot an innocent duck. Below we will create server links that only exist so that they can be referenced by the tag "<img />" 
    const lista={} 
    Obrazek.find({}, (err, obrazki)=>{ 
        if(err) return console.error(err) 
        obrazki.map((item, index)=>{ 
            //lista[index]=item.name 
            lista[index]=item.name    
        }) 
        console.log(lista) 
        res.json(lista) //Here we have a shipment time! :D 
    }) 
}) 
app.get('/Images', (req, res)=>{ //If you type: "http://localhost:5000/Images?images=[name of an image]" that should show itself on the entire screen, cool, isn't it? Read about "params" and "query". 
    const imig=req.query.images  
    Obrazek.find({name: imig}, (err, obrazek)=>{ //The first argument is the search detail, we don't always want to search for everything 
        if(err) return console.error(err) 
        res.write(obrazek[0].image.data) //The "write" method just writes something to the screen. It can be text, in this case it is indicated by the link details photo. Why not the "send" function which does exactly the same? Because it happened that on some browsers the file was downloaded instead of being shown to the viewer. The mongoose: "find" "framework" function always produces an array. So we just take its first element. 
        res.end() //The "write" function is always followed by the "end" function. Read why :D 
    }) 
})

app.listen(SERVER_PORT, ()=>console.log("Witaj na stronie! :D")) //The second thing necessary for this application to work is "listening" to applications on a specific port. Here it's a variable because usually things like server port hide in an invisible ".env" peak. My intention in this case is "5000", but that could be a different (4-cipherish) number. After the decimal point, you have the so-called "callback", which is for this example: "What is to return the program in return". It doesn't have to be here, the most important thing is the port. 