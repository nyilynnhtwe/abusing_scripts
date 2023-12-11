const app = require("express")();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

app.get("/", (req, res) => {
  res.send("Dota 2 heros api by Florject.\n Get all heros - /api/heros \n Get a hero by id - /api/heros/:id ");
});

app.get("/api/heros", (req, res) => {
  fs.readFile(filePath, "utf8", (err, file) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const data = JSON.parse(file);
      res.send(data);
    } catch (err) {
      console.error("Error while parsing JSON data:", err);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.get("/api/heros/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(filePath, "utf8", (err, file) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const data = JSON.parse(file);
      let result = "No valid hero";

      for (let index = 0; index < data.length; index++) {
        const hero = data[index];
        if (hero.id === id) {
          result = hero;
          break;  // Found the hero, no need to continue the loop
        }
      }

      res.send(result);
    } catch (err) {
      console.error("Error while parsing JSON data:", err);
      res.status(500).send("Internal Server Error");
    }
  });
});

module.exports = app;
