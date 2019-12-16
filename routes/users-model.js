const db = require("../data/dbConfig.js");

function get() {
  return db("users");
}

function findBy(param) {
  return db("users")
    .where(param)
    .first();
}

function add(user) {
  return db("users")
    .insert(user)
    .then(user => findBy({ id: user[0] }));
}

module.exports = { get, findBy, add };
