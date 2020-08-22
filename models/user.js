const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    name: String,
    lastName: String,
    DNI: String,
    NAF: Number,
    genre: { type: String, enum: ["Hombre", "Mujer"] },
    adress: String,
    postalCode: Number,
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
