const express = require("express");
const port = process.env.PORT;
const cors = require("cors");
const routerUser = require("../routes/user.routes");

class Server {
  constructor() {
    this.app = express();
    this.usersPath = "/api/users";

    //middleware
    this.middleware();

    // Routes
    this.routes();
  }

  middleware() {
    //cors
    this.app.use(cors());

    // read and parsert body
    this.app.use(express.json());

    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.usersPath, routerUser);
  }
  listen() {
    this.app.listen(port);
  }
}

module.exports = Server;
