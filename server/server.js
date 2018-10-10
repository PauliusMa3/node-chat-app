const path = require('path');
const http = require('http')
const express = require('express')
const socketIO=require('socket.io')


const publicPath = path.join(__dirname,'/../public');
var app = express();
var port = process.env.PORT||3000;

var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New USer Connected');

    socket.emit('newMessage', {
        from: 'kobe.bryant@gmail.com',
        text: 'Hello! Do you want to play?',
        createdAt: new Date()
    })

    socket.on('createMessage',(message) => {
        console.log(message);
    })

    socket.on('disconnect', () => {
        console.log("Disconnected!!!")
    })
})


server.listen(port, () => {
    console.log(`Started server at port: ${port}`);
})

module.exports={app}

