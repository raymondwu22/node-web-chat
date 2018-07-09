const socket = io();

const scrollToBottom = () => {
  // selectors
  const messages = $("#messages");
  const newMessage = messages.children("li:last-child");

  // heights
  const clientHeight = messages.prop("clientHeight");
  const scrollTop = messages.prop("scrollTop");
  const scrollHeight = messages.prop("scrollHeight");
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", message => {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const template = $("#message-template").html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
  scrollToBottom();
});

socket.on("newLocationMessage", message => {
  const formattedTime = moment(message.createdAt).format("h:mm a");

  const template = $("#location-message-template").innerHTML;
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
  scrollToBottom();
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
