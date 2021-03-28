const Criteria = require("../models/Criteria");

module.exports = {
  addCriteria: async (req, res) => {
    const { name, alias, initialWeight, repairWeight } = req.body;
    try {
      const response = await Criteria.create({
        name,
        alias,
        initialWeight,
      });
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCriteria: async (req, res) => {
    const { name, alias, initialWeight } = req.body;
    const { _id } = req.params;
    try {
      const response = await Criteria.findByIdAndUpdate(
        { _id },
        {
          name,
          alias,
          initialWeight,
        },
        {
          returnOriginal: false,
        }
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCriteria: async (req, res) => {
    try {
      const response = await Criteria.find({ deleteAt: null });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCriteria: async (req, res) => {
    const { _id } = req.params;
    try {
      const response = await Criteria.findByIdAndUpdate(
        { _id },
        { deleteAt: new Date() }
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
