const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    StartDate: Date,
    EndDate: Date,
    ContractType: String,
    ContractCode: Number,
    Category: String,
    JobRole: String,
    Salary: String,
    Bonus: String,
    Educacion: String,
    VacationDays: Number,
    AditionalClauses: String,
    User: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
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
