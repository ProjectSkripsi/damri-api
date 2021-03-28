const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const criteriaSchema = new Schema(
  {
    name: {
      type: String,
    },
    alias: {
      type: String,
    },
    initialWeight: {
      type: Number,
    },
    repairWeight: {
      type: Number,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Criteria = mongoose.model("Criteria", criteriaSchema);
module.exports = Criteria;
