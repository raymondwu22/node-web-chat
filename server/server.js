const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
// set-up server to allow socket.io
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log(`New user connected. ${socket}`);

  // create custom event && custom data
  socket.emit('newMessage', {
    from: 'mike',
    text: 'Hello there',
    createdAt: 123,
  });

  socket.on('createMessage', data => {
    console.log('Message sent', data);
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
