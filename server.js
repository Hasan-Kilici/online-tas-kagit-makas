const http = require("http");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const cookieParser = require("cookie-parser");

app.use(cookieParser());
const port = 8080;
//Body Parser
app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//Statik
app.use(express.static("public"));
app.set("src", "path/to/views");

const dbURL = process.env.db;
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    server.listen(port, () => {
      console.log("mongoDB Bağlantı kuruldu");
    });
  })
  .catch((err) => console.log(err));
//Socket
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on("makas", (data)=>{
    io.emit("makas", data)
  })
  console.log('Kullanıcı giriş yaptı');
  socket.on('team1-tas', (data)=>{
    io.emit('team1-tas', data)
    console.log(`${data} Kullanıcısı Taş yaptı`)
  })
  socket.on('team2-tas', (data)=>{
    io.emit('team2-tas', data)
    console.log(`${data} Kullanıcısı Taş yaptı`)
  })
   socket.on('team1-kagit', (data)=>{
    io.emit('team1-kagit', data)
    console.log(`${data} Kullanıcısı Kağıt yaptı`)
  })
  socket.on('team2-kagit', (data)=>{
    io.emit('team2-kagit', data)
    console.log(`${data} Kullanıcısı Kağıt yaptı`)
  })
  socket.on('team1-makas', (data)=>{
    io.emit('team1-makas', data)
    console.log(`${data} Kullanıcısı Makas yaptı`)
  })
  socket.on('team2-makas', (data)=>{
    io.emit('team2-makas', data)
    console.log(`${data} Kullanıcısı Makas yaptı`)
  })
  socket.on('beraberlik', (data)=>{
    io.emit("beraberlik")
    console.log("Berabere");
  })
  socket.on('team1-galibiyet',(data)=>{
    io.emit("team1-galibiyet")
    console.log("Team 1 Kazandı");
  })
  socket.on('team2-galibiyet',(data)=>{
    io.emit("team2-galibiyet")
    console.log("Team 2 Kazandı");
  })
});

//Collections
let Users = require('./models/users.js')

app.get('/',(req,res)=>{
  var userId = req.cookies.id;
  if(userId != null){
    Users.findById(userId).then((UserResult)=>{
      res.render(`${__dirname}/src/pages/index.ejs`,{user:UserResult})
    })
  } else {
    res.render(`${__dirname}/src/pages/login.ejs`)
  }
})

app.post('/login',(req,res)=>{
   var users = new Users({
   username : req.body.username,
   team: req.body.team
   })
   users.save()
   .then((UserResult)=>{
   res.cookie('id', UserResult._id)
   res.redirect('/')
   })  
  })
