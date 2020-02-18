const express = require('express');
const bodyParser = require('body-parser');
const user = require('./user.js')

const PORT = 8080;

const app = express();


let getFecha = () => new Date().toLocaleDateString().replace(/-/g,'/');
let getOffset = id => usuarios.findIndex(usuario => usuario.id == id);
let usuarios = []
// app.use(bodyParser.urlencoded({extended:true})) // tipos de datos binarios distintos de string extiende el parse
app.use(bodyParser.json())
app.get('/generar/:cant?',(req,res)=> {
  let cant = req.params.cant || 50;
  usuarios = [];
  for (let i = 0; i < cant; i++) {
    let usuario = user.getNewUser();
    usuario.id = i + 1
    usuario.fecha = getFecha()
    usuarios.push(usuario);
    
  }
  res.send(usuarios)
})
app.get('/:id', (req,res)=> {
  // let datos = req.query;
  // res.send(`Express Server ok GET! ${JSON.stringify(datos)}` );
  let id = req.param.id;
  if (id !== undefined) {
    let offset = usuarios.findIndex(usuario => usuario.id === id)
    res.send(usuarios[offset])
  } else {
    res.send(usuarios);
  }
})

app.post('/', (req,res)=> {
  let usuario = req.body;
  //res.send(`Express Server ok POST! ${JSON.stringify(usuario)}` );
  usuario.id = usuarios.length + 1
  usuario.fecha = getFecha()
  usuarios.push(usuario)

  res.send(usuario);
})

// app.get('/generar',(req,res)=>{
//   res.send(user.getNewUser());
// })
app.delete('/:id',(req,res)=> {
  let id = req.params.id
  let offset = getOffset(id)
  let usuario = usuarios[offset]
  usuarios.splice(offset,1)
  
  res.send(usuario)
})
app.get('/generar/:cant?',(req,res)=> {
  let cant = req.params.cant || 50;
  usuarios = [];
  for (let i = 0; i < cant; i++) {
    let usuario = user.getNewUser();
    usuario.id = i + 1
    usuario.fecha = getFecha()
    usuarios.push(usuario);
    
  }
  res.send(usuarios)
})


// Update
app.put('/:id',(req,res)=> {
  let id = req.params.id
  let usuario = req.body
  usuario.id = id
  usuario.fecha = getFecha()
  usuarios[getOffset(id)] = usuario
  res.send(usuario)
})
app.listen(PORT,err => {
  if (err) return console.log(`Servidor en error:${err}`)
  console.log(`Servidor express escuchando en el puerto ${PORT} 💄`);
})