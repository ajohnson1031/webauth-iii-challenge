const bcrypt = require("bcryptjs");

module.exports = {
  jwtSecret: process.env.JWT_SECRET || bcrypt.hashSync("J35U515K1NG", 16)
};
