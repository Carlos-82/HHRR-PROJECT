const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    RegisterName: String,
    TradeName: String,
    CIF: String,
    Adress: String,
    CP: Number,
    LegalPersonality: { type: String, enum: fisica, juridica },
    User: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
