const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataTraining = new Schema(
  {
    ID: {
      type: String,
    },
    name: {
      type: String,
    },
    data: [
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
      },
    ],
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const DataTraining = mongoose.model('DataTraining', dataTraining);
module.exports = DataTraining;
