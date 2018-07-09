const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', message => {
  const li = document.createElement('li');

  li.textContent = `${message.from}: ${message.text}`;

  $('#messages')[0].appendChild(li);
});

$('#message-form').on('submit', e => {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: $('[name=message]').val(),
    },
    data => {
      console.log(data);
    }
  );
});
