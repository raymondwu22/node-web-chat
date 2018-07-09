const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
// set-up server to allow socket.io
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log(`New user connected. ${socket}`);

  // greet our individual user.
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // broadcast sends message to every user but this socket
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // create custom event && custom data
  socket.on('createMessage', (data, cb) => {
    io.emit('newMessage', generateMessage(data.from, data.text));
    cb('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
