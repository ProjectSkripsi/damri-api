const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hash = require("../helpers/hash");

const technicianSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please input your name"],
    },
    username: {
      type: String,
      required: [true, "Please input your username"],
    },
    password: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please input your address"],
    },
    contact: {
      type: String,
      required: [true, "Please input your contact"],
    },
    role: {
      type: String,
      default: "teknisi",
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

// technicianSchema.post("validate", function () {
//   this.password = hash.encode(this.password);
// });

const Technician = mongoose.model("Technician", technicianSchema);
module.exports = Technician;
