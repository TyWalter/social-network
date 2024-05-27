// Requiring in express
const router = require("express").Router();
const users = require("./users");
const thoughts = require("./thoughts");

// Diverting traffic accordingly
router.use("/users", users);
router.use("/thoughts", thoughts);
router.use((req,res) => res.send("Invalid Route!"));

// Exporting
module.exports = router;