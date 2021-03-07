const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busSchema = new Schema(
  {
    idBus: {
      type: String,
    },
    vechileType: {
      type: String,
      required: [true, "Please input your vechileType"],
    },
    policeNo: {
      type: String,
      required: [true, "Please input your policeNo"],
    },
    imageUrl: [
      {
        url: String,
        status: {
          type: String,
          default: "done",
        },
        isCover: {
          type: Boolean,
          default: false,
        },
      },
    ],

    firstAid: {
      type: Number,
    },
    frontPlate: {
      type: Number,
    },
    rearPlate: {
      type: Number,
    },
    inspectionBook: {
      type: Number,
    },
    spareTire: {
      type: Number,
    },
    headLightRight: {
      type: Number,
    },
    headLightLeft: {
      type: Number,
    },
    frontFlaserLightRight: {
      type: Number,
    },
    frontFlaserLightLeft: {
      type: Number,
    },
    rearFlaserLightRight: {
      type: Number,
    },
    rearFlaserLightLeft: {
      type: Number,
    },
    stopLightRight: {
      type: Number,
    },
    stopLightLeft: {
      type: Number,
    },
    backupLightRight: {
      type: Number,
    },
    backupLightLeft: {
      type: Number,
    },
    platLight: {
      type: Number,
    },
    hazardLight: {
      type: Number,
    },
    horn: {
      type: Number,
    },
    safetyBeltFront: {
      type: Number,
    },
    safetyBeltBack: {
      type: Number,
    },
    handBreake: {
      type: Number,
    },
    cabinMirror: {
      type: Number,
    },
    fireExtiungiser: {
      type: Number,
    },
    jack: {
      type: Number,
    },
    jackHandle: {
      type: Number,
    },
    tireWrech: {
      type: Number,
    },
    fanBelt: {
      type: Number,
    },
    triangle: {
      type: Number,
    },
    cutterMirrorRight: {
      type: Number,
    },
    cutterMirrorLeft: {
      type: Number,
    },
    engineOil: {
      type: Number,
    },
    radiatorCooling: {
      type: Number,
    },
    brakeOil: {
      type: Number,
    },
    wiperWater: {
      type: Number,
    },
    liquidBAttery: {
      type: Number,
    },
    airConditioner: {
      type: Number,
    },
    tirePreasureTester: {
      type: Number,
    },
    tirePreasureFront: {
      type: Number,
    },
    tirePreasureRear: {
      type: Number,
    },
    others: {
      type: String,
    },
    inspectionBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: false,
    },
    result: {
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

const Bus = mongoose.model("Bus", busSchema);
module.exports = Bus;
