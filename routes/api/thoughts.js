// Requiring in Express and controllers
const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require("../../controllers/thoughtController");

// /api/thoughts
router
  .route("/")
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

// Exporting
module.exports = router;