const router = require("express").Router();
const users = require("./users-model.js");
const restricted = require("../middleware/restricted.js");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.json({ api: "is up and running...better catch it!" });
});

router.get("/users", restricted, async (req, res) => {
  try {
    const allUsers = await users.get();

    allUsers
      ? res.json({ allUsers })
      : res.status(404).json({ message: "No users found." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const User = await users.findBy({ username });

    if (User && bcrypt.compareSync(password, User.password)) {
      const token = genToken(User);
      res.status(200).json({ message: `Welcome, ${username}!`, token: token });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

function genToken(User) {
  const payload = {
    subject: User.id
  };

  const options = { expiresIn: "1d" };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
