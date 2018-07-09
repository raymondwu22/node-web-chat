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

socket.on('newLocationMessage', message => {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);

  a.textContent = 'My current location';
  li.textContent = `${message.from}: `;
  li.appendChild(a);
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

$('#send-location').on('click', e => {
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      alert('Unable to fetch location');
    }
  );
});
