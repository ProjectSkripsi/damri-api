const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bus = require("./Bus");

const scheduleSchema = new Schema(
  {
    busId: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
    },

    day: {
      type: String,
    },
    hoursDeparture: {
      type: String,
    },
    departure: {
      type: String,
    },
    destination: {
      type: String,
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

scheduleSchema.pre("save", function (next) {
  Bus.updateOne(
    { _id: this.busId },
    {
      $push: { scheduled: this._id },
    }
  )
    .then((response) => {
      next();
    })
    .catch((err) => console.log(err));
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
