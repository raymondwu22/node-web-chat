const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Jen',
    text: 'Hello there',
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', data => {
  console.log('New message', data);
});
