const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    Name: String,
    Lastname: String,
    DNI: String,
    NAF: Number,
    Genre: { type: String, enum: ["Hombre", "Mujer"] },
    Adress: String,
    CP: Number,
    Birthdate: Date,
    Admin: { type: Boolean, default: true },
    Avatar: String,
    Email: {
      type: String,
      validate: [validator.isEmail, "Please insert a correct Email"],
    },
    Password: String,
    Company: { type: Schema.Types.ObjectId, ref: "Empresa" },
    Contract: [{ type: Schema.Types.ObjectId, ref: "Contrato" }],
    Absences: [{ type: Schema.Types.ObjectId, ref: "Ausencias" }],
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
