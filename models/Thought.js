// Requiring in mongoose
const {Schema, model} = require("mongoose");
const reactionSchema = require("./Reaction");

// Thought model template
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) {
          return date.toISOString().split("T")[0];
        }
      }
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// Thought virtual reaction count 
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Creation of model from schema
const Thought = model('thought', thoughtSchema)

module.exports = Thought;