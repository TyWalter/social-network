// Requiring in mongoose and models
const {ObjectId} = require("mongoose").Types;
const {User, Thought, Reaction} = require("../models");

// Exporting controllers
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch(err) {
      return res.status(500).json(err.message);
    }
  },

  // Get single user
  async getUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .select("-__v");
      if(!user) {
        return res.status(404).json({message: 'No user with that ID'})
      }
      res.json(user);
    } catch(err) {
      return res.status(500).json(err.message);
    }
  },

  // Create single user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch(err) {
      return res.status(500).json(err.message);
    }
  },

  // Update single user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
      );
      if(!user) {
        res.status(404).json({message: 'No user with that ID'});
      }
      res.json(user);
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Delete single user and their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({_id: req.params.userId});
      if(!user) {
        return res.status(404).json({message: 'Not user with that ID'});
      }
      await Thought.deleteMany({_id: {$in: user.thoughts}});
      res.json({message: 'User successfully deleted'});
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Create friend and add to list
  async createFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      )
      if(!user) {
        res.status(404).json({message: 'No user with that ID'});
      }
      res.json({message: 'Friend successfully added'});
    } catch(err) {
      return res.status(500).json(err.message);
    }
  },

  // Delete friend from list
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      )
      if(!user) {
        res.status(404).json({message: 'No user with that ID'});
      }
      res.json({message: 'Friend successfully added'});
    } catch(err) {
      return res.status(500).json(err.message);
    }
  }
}