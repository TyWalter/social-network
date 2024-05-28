// Requiring in models
const {User, Thought} = require("../models");

// Exporting controllers
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const user = await User.find()
        .populate({path: "thoughts"})
        .populate({path: "friends"});
      res.json(user);
    } catch(err) {
      return res.status(500).json(err.message);
    }
  },

  // Get single user
  async getUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .populate({path: "thoughts"})
        .populate({path: "friends"});
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
        return res.status(404).json({message: 'No user with that ID'});
      }
      await Thought.deleteMany({_id: {$in: user.thoughts}});
      res.json({message: 'User successfully deleted'});
    } catch(err) {
      res.status(500).json(err.message);
    }
  },

  // Create single friend and add to array
  async createFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      )
      if(!friend) {
        res.status(404).json({message: 'No user with that ID'});
      }
      res.json({message: 'Friend successfully added'});
    } catch(err) {
      return res.status(500).json(err.message);
    }
  },

  // Delete single friend from array
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      )
      if(!friend) {
        res.status(404).json({message: 'No user with that ID'});
      }
      res.json({message: 'Friend successfully deleted'});
    } catch(err) {
      return res.status(500).json(err.message);
    }
  }
};