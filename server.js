const express = require("express");
const apiRouter = require("./routes");
const middlewareConfig = require("./middleware");

const server = express();

middlewareConfig(server);

server.use("/api", apiRouter);

module.exports = server;
