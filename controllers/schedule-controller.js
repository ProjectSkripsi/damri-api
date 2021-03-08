const Schedule = require("../models/Schedule");
const Bus = require("../models/Bus");

module.exports = {
  addSchedule: async (req, res) => {
    const { busId, day, hoursDeparture, departure, destination } = req.body;
    try {
      const response = await Schedule.create({
        busId,
        day,
        hoursDeparture,
        departure,
        destination,
      });
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getSchedule: async (req, res) => {
    try {
      const response = await Schedule.find({ deleteAt: null }).populate(
        "busId"
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteSchedule: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await Schedule.findOneAndUpdate(
        {
          _id: id,
        },
        {
          deleteAt: Date.now(),
        },
        {
          returnOriginal: false,
        }
      );
      if (response) {
        const result = await Bus.findOneAndUpdate(
          {
            _id: response.busId,
          },
          {
            $pull: { scheduled: response._id },
          }
        );
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getScheduleById: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await Schedule.findOne({ _id: id }).populate("busId");
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateSchedule: async (req, res) => {
    const { id } = req.params;
    const { busId, day, hoursDeparture, departure, destination } = req.body;
    try {
      const response = await Schedule.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          busId,
          day,
          hoursDeparture,
          departure,
          destination,
        },
        {
          returnOriginal: false,
        }
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
