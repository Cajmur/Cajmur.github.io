const app=require('express')() 
const cors=require('cors')
require('dotenv').config()  
require('./db') 
const bodyParser=require('body-parser')
//const type=require('./types') 
const Obrazek=require('./types')
const { runInNewContext } = require('vm') 
const fs=require('fs') 
const multer=require('multer') 
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
const {SERVER_PORT}=process.env 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: true})) 

const corsOptions={ 
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
} 
app.use(cors(corsOptions))

app.post('/wstawianie', upload.single("zdjecie"), (req, res)=>{ 
    console.log(req.file) 
    const img={ 
        data: fs.readFileSync(path.join(__dirname + '/Images/' + req.file.filename)), 
        contentType: req.file.mimetype  
    } 
    Obrazek.create({name: req.file.filename, image: img}) 
}) 
app.get('/usunwszystkie', (req, res)=>{ 
    Obrazek.deleteMany({}, (err)=>{ 
        if(err) return console.error(err) 
    }) 
}) 
app.get('/wyszukaj', (req, res)=>{ 
    const lista={} 
    Obrazek.find({}, (err, obrazki)=>{ 
        if(err) return console.error(err) 
        obrazki.map((item, index)=>{ 
            //lista[index]=item.name 
            lista[index]=item.name    
        }) 
        console.log(lista) 
        res.json(lista) 
    }) 
}) 
app.get('/Images', (req, res)=>{ 
    const imig=req.query.images  
    Obrazek.find({name: imig}, (err, obrazek)=>{ 
        if(err) return console.error(err) 
        res.write(obrazek[0].image.data) 
        res.end() 
    }) 
})
app.get('/', (req, res)=>{ 
    res.send("ljhjyg") 
}) 

app.listen(SERVER_PORT, ()=>console.log("Witaj na stronie! :D")) 