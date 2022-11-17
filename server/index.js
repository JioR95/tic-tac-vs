const app = express();
const express = require('express');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });


io.on('connection', (socket) => {
  console.log("User is Connected");

  socket.on('joinRoom', (roomCode) => {
    console.log(`User has now joined the room ${roomCode}`);
    socket.join(roomCode);
  });

  socket.on('play', ({ id, roomCode }) => {
    console.log(`play at ${id} to ${roomCode}`);
    socket.broadcast.to(roomCode).emit('updateGame', id);
  });

  socket.on('disconnect', () => {
    console.log('User is Disconnected');
  });
});

server.listen(5000, () =>
  console.log('server running => http://localhost:5000')
);