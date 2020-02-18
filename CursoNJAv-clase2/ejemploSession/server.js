const express = require('express')
const app = express()
const PORT = 8080;
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session) // Mantiene la sesión después de cerrar la pestaña Se guardan en la carpeta sessions

app.use(cookieParser()) 
app.use(session({
  secret: 'shhhhhh',
  resave: false,
  saveUninitialized:false,
  store: new FileStore(),
  // cookie:{
  //   maxAge:20000
  // }
}))

app.get('/',(req,res) => { //Se incrementan las visitas por sesion
  if (req.session.visits) {
    req.session.visits++
    res.send(`You've visited the page ${req.session.visits} times `)
  } else {
    req.session.visits = 1
    res.send('Welcome!')
  }
})

app.get('/i',(req,res) => {
  console.log('--------------req.session--------------')
  console.log(req.session)
  console.log('---------------------------------------')
  console.log(' ')
  console.log('-----------req.sessionID---------------')
  console.log(req.sessionID)
  console.log('---------------------------------------')
  console.log(' ')
  console.log('-----------req.cookies---------------')
  console.log(req.cookies)
  console.log('---------------------------------------')
  console.log(' ')
  console.log('-----------req.sessionStore------------')
  console.log(req.sessionStore)

  res.send('OK info')
})

app.get('/logout',(req,res) => {
    req.session.destroy(err=>{
      if (!err) res.send('LOGOUT ok!')
      else res.send('Logout error!')
    })
})

app.listen(PORT, err=> {
  if(err)  return console.log(`ERROR AT SERVER: ${err}`)
  console.log(`Server listening port ${PORT}`)
})