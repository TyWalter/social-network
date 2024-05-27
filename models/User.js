// Requiring in mongoose
const {Schema, model} = require("mongoose");

// User model template
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought"
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// User virtual friend count 
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Creation of model from schema
const User = model("user", userSchema);

module.exports = User