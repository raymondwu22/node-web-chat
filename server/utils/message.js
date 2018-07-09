const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date().getTime(),
});

const generateLocationMessage = (from, lat, lng) => ({
  from,
  url: `https://www.google.com/maps?q=${lat},${lng}`,
  createdAt: new Date().getTime(),
});

module.exports = {
  generateMessage,
  generateLocationMessage,
};
