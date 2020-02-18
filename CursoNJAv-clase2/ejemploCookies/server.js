const express = require('express')
const app = express()
const PORT = 8080;
const cookieParser = require('cookie-parser')

app.use(cookieParser()) 

app.get('/',(req,res) => {
  res.send('Server Express ok!')
})

app.get('/set',(req,res) => {
  res.cookie('nombre', 'express').send('Cookie Set')
})

app.get('/setEX',(req,res) => {
  res.cookie('nombre2', 'express2',{maxAge:20000}).send('Cookie Set with Exp')
})

app.get('/clr',(req,res) => { //Borrar
  res.clearCookie('nombre').send('Cookie nombre was Clear ')
})
app.get('/get',(req,res) => { // Devuelve las cookies del navegador
  res.send(req.cookies)
})

app.listen(PORT, err=> {
  if(err)  return console.log(`ERROR AT SERVER: ${err}`)
  console.log(`Server listening port ${PORT}`)
})