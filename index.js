const logger = require("./Utils/logger.js");
const express = require("express");
const app = express();

app.appDir = __dirname;

app.use(express.json());

// controller setup
const RoutesController = require("./Controllers/Routes.Controller");
RoutesController.setupRoutes(express, app);

app.listen(9000, "0.0.0.0", () => logger.log("Node.js server started on port 9000."));