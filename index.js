const app = require("express")();
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require(path.join(__dirname, "./doc"));

const specs = swaggerJsdoc(options);
app.use(cors());


const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css";

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { customCssUrl: CSS_URL })
);

const filePath = path.join(__dirname, "data.json");

app.get("/", (req, res) => {
  res.redirect("https://abusing-scripts.vercel.app/api-docs");
  // res.redirect("http://localhost:3000/api-docs");
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
  const id = +req.params.id;
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
        }
      }

      res.send(result);
    } catch (err) {
      console.error("Error while parsing JSON data:", err);
      res.status(500).send("Internal Server Error");
    }
  });
});

// app.listen(3000);

module.exports = app;
