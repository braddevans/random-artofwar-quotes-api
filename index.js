if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.x or higher is required. Update Node on your system.");
require("dotenv").config();
const logger = require("./Utils/logger.js");
const express = require("express");
const app = express();

app.appDir = __dirname;

app.use(express.json());
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

// controller setup
const RoutesController = require("./Controllers/Routes.Controller");
RoutesController.setupRoutes(express, app);

app.listen(9000, "0.0.0.0", () => logger.log("Node.js server started on port 9000."));