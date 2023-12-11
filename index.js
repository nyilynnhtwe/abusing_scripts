const app = require("express")();
const fs = require("fs");

app.get("/api/heros", (req, res) => {
  res.send("Dota 2 heros api by Florject.");
});

app.get("/api/heros", (req, res) => {
  fs.readFile("data.json", "utf8", (err, file) => {
    const data = JSON.parse(file);
    res.send(data);
  });
});

app.get("/api/heros/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("data.json", "utf8", (err, file) => {
    // check for any errors
    if (err) {
      if (err) {
        res.status(500).send("Internal Server Error");
      }
    }
    try {
      const data = JSON.parse(file);
      let result;
      for (let index = 0; index < data.length; index++) {
        const hero = data[index];
        if (hero.id === id) {
          result = data;
        } else {
          result = "No valid hero";
        }
      }
      res.send(result);
    } catch (err) {
      console.error("Error while parsing JSON data:", err);
    }
  });
});

module.exports = app;
