const app = require("express")();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

const specs = swaggerJsdoc(options);
app.use(cors());

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css";

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { customCssUrl: CSS_URL })
);


// * ------------------------------------------------ swagger endpoint -------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Heros:
 *       type: object
 *       required:
 *         - name
 *         - localized_name
 *         - primary_attr
 *         - attack_type
 *         - roles
 *         - legs
 *         - imageUrl
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the hero
 *         name:
 *           type: string
 *           description: The name of hero
 *         localized_name:
 *           type: string
 *           description: The localized name of hero
 *         primary_attr:
 *           type: boolean
 *           description: Primary attribute of hero
 *         attack_type:
 *           type: string
 *           description: Attack type of hero
 *         roles:
 *           type: string[]
 *           description: Roles of hero
 *         legs:
 *           type: string
 *           description: Number of legs of hero
 *         imageUrl:
 *           type: string
 *           description: Image Url of hero
 *       example:
 *             "id": 5
 *             "name": "npc_dota_hero_crystal_maiden"
 *             "localized_name": "Crystal Maiden"
 *             "primary_attr": "int"
 *             "attack_type": "Ranged"
 *             "roles": ["Support", "Disabler", "Nuker"]
 *             "legs": 2
 *             "imageUrl": "https://liquipedia.net//commons/images/thumb/d/dc/Crystal_Maiden_Large.png/125px-Crystal_Maiden_Large.png"
 */

/**
 * @swagger
 * /api/heros:
 *   get:
 *     summary: Lists all the heros
 *     tags: [Heros]
 *     responses:
 *       200:
 *         description: The list of the heros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Heros'
 * /api/heros/{id}:
 *   get:
 *     summary: Get the hero by id
 *     tags: [Heros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hero id
 *     responses:
 *       200:
 *         description: The hero response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Heros'
 *       404:
 *         description: The hero was not found
 */

// * ------------------------------------------------ swagger endpoint -------------------------------------------

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
