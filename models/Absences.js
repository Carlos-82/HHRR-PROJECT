const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    Vacation: [{ type: Schema.Types.ObjectId, ref: "Vacation" }],
    Sickness: [{ type: Schema.Types.ObjectId, ref: "Sickness" }],
    Permission: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    User: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("Absences", userSchema);

module.exports = User;
