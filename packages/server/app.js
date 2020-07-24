const express = require('express');
const app = express();
const http =require('http').Server(app);

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(msg);
    io.emit('event', msg);
  });
});

http.listen(3000, () => console.log('Listening on port 3000'));
