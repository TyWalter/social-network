// Requiring in mongoose
const {Schema, Types} = require("mongoose");

// Reaction model template
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) {
          return date.toISOString().split("T")[0];
        }
      }
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false,
    versionKey: false
  }
);

module.exports = reactionSchema;