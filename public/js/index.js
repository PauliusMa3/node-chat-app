var socket = io();

socket.on('connect',function () {
    console.log('Connected to server')

    socket.emit('createMessage', {
        to: 'Phoebe@gmail.com',
        text: 'what up mate?'
    })
})

socket.on('disconnect',function () {
    console.log('Disconnected from server')
})

socket.on('newMessage',function(message) {
    console.log('new Message has arrived',message)
})