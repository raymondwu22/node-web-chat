const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", message => {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const li = document.createElement("li");

  li.textContent = `${message.from} [${formattedTime}]: ${message.text}`;

  $("#messages").appendChild(li);
});

socket.on("newLocationMessage", message => {
  const formattedTime = moment(message.createdAt).format("h:mm a");

  const li = document.createElement("li");
  const a = document.createElement("a");

  a.setAttribute("target", "_blank");
  a.setAttribute("href", message.url);

  a.textContent = "My current location";
  li.textContent = `${message.from} [${formattedTime}]: `;
  li.appendChild(a);
  $("#messages").appendChild(li);
});

$("#message-form").on("submit", e => {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("[name=message]").value
    },
    () => {
      $("[name=message]").value = "";
    }
  );
});

$("#send-location").on("click", e => {
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  $("#send-location").setAttribute("disabled", "disabled");
  $("#send-location").textContent = "Sending Location...";
  navigator.geolocation.getCurrentPosition(
    position => {
      $("#send-location").removeAttribute("disabled");
      $("#send-location").textContent = "Send Location";
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      $("#send-location").removeAttribute("disabled");
      $("#send-location").textContent = "Send Location";
      alert("Unable to fetch location");
    }
  );
});
