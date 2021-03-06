const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    DNI: String,
    NAF: Number,
    nationality: String,
    genre: { type: String, enum: ["Male", "Female"] },
    address: String,
    postalCode: Number,
    country: String,
    birthDate: Date,
    admin: { type: Boolean, default: true },
    avatar: String,
    email: {
      type: String,
      validate: [validator.isEmail, "Please insert a correct Email"],
    },
    password: String,
    companyId: { type: Schema.Types.ObjectId, ref: "Company" },
    contract: [{ type: Schema.Types.ObjectId, ref: "Contract" }],
    absences: [{ type: Schema.Types.ObjectId, ref: "Absences" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
