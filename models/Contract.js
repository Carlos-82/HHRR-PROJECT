const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    startDate: Date,
    endDate: Date,
    contractType: String,
    contractCode: Number,
    category: String,
    workDay: String,
    workHours: Number,
    jobRole: String,
    salary: String,
    bonus: String,
    educationLevel: String,
    vacationDays: Number,
    aditionalClauses: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("Contract", userSchema);

module.exports = User;
