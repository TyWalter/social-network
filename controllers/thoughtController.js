// Requiring in models
const {User, Thought} = require("../models");

// Exporting controllers
module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Get single thought
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtId});
      if(!thought) {
        return res.status(404).json({message: 'No thought with that ID'})
      }
      res.json(thought);
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Create single thought and add to userId if applicable
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet: {thoughts: req.params.thoughtId}},
        {runValidators: true, new: true}
      );
      if(!user) {
        res.status(404).json({message: 'No user with that ID'});
      }
      res.json(thought);
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Update single thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        {runValidators: true, new: true}
      );
      if(!thought) {
        res.status(404).json({message: 'No thought with that ID'});
      }
      res.json(thought);
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Delete single thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
      if(!thought) {
        return res.status(404).json({message: 'No thought with that ID'});
      }
      res.json({message: 'Thought successfully deleted'});
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Create single reaction and add to array
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.params.reactionId}},
        {runValidators: true, new: true}
      )
      if(!reaction) {
        res.status(404).json({message: 'No thought with that ID'});
      }
      res.json({message: 'Reaction successfully added'});
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Delete single reaction from array
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions: req.params.reactionId}},
        {runValidators: true, new: true}
      )
      if(!reaction) {
        res.status(404).json({message: 'No thought with that ID'});
      }
      res.json({message: 'Reaction successfully deleted'});
    } catch(err) {
      res.status(500).json(err.message);
    }
  }
};