const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Dota2 Heros from liquipedia.net",
      version: "0.1.0",
      description: "Dota 2 heros api by Florject",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
