const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    registerName: String,
    tradeName: String,
    CIF: String,
    CCC: Number,
    address: String,
    postalCode: Number,
    country: String,
    registerDate: Date,
    legalPersonality: { type: String, enum: ["fisica", "juridica"] },
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    colectiveAgreement: String,
    mutualInsurance: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("Company", userSchema);

module.exports = User;
