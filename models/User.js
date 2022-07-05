const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
      username: String,
      password: String,
      name: String,
      lastName: String,
      street: String, 
      vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'  
      },
      email: String,
      phone: Number,

  },

  { // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
