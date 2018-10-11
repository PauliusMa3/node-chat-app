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

    socket.emit('newMessage',{from: 'Admin', text: 'Welcome to the Chat Application! Have fun',createdAt: new Date().getTime()})

    socket.broadcast.emit('newMessage',
    {
        from: 'Admin',
        text: 'New User Joined!',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage',(message) => {
        console.log(message);
        // io.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log("Disconnected!!!")
    })
})


server.listen(port, () => {
    console.log(`Started server at port: ${port}`);
})

module.exports={app}

