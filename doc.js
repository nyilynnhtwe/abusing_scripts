const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Dota2 Heros API",
      version: "0.1.0",
      description: "Dota 2 heros api by Florject",
    },
    servers: [
      {
        url: "https://abusing-scripts.vercel.app",
        // url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./*.js"],
};

module.exports = options;
