const PORT = 8080
require('http').createServer((req,res)=>res.end(`Server http ${PORT+1}`)).listen(PORT+1)
require('http').createServer((req,res)=>res.end(`Server http ${PORT+2}`)).listen(PORT+2)
require('http').createServer((req,res)=>res.end(`Server http ${PORT+3}`)).listen(PORT+3)
require('http').createServer((req,res)=>res.end(`Server http ${PORT+4}`)).listen(PORT+4)


const http = require('http');

const server = http.createServer((req,res)=> {

  setTimeout(()=> { // una forma de no bloquear a los otros procesos.
    res.end(`Server http ${PORT}`);
  },10000)
  //for (let i=0;i<5e9; i++); //bloqueo de loop principal
  //res.end(`Server Http ${PORT}`) //manda mensaje al browser
})

server.listen(PORT,err => {
  if (err) return console.log(`Error : ${err}`)
  
  console.log(`Server http ${PORT}`)
})
