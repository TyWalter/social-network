// Requiring in express
const router = require("express").Router();
const apiRoutes = require("./api");

// Directing traffic to API routes
router.use("/api", apiRoutes);
router.use((req,res) => res.send("Invalid Route!"));

// Exporting
module.exports = router;