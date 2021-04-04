const Criteria = require('../models/Criteria');
const DataTraining = require('../models/DataTraining');
const _ = require('lodash');
// const { dataLearning } = require('./dummyData');
const {
  sumNumber,
  calculateNewWeight,
  getCriterias,
  algoritma,
} = require('../helpers/utils');

const sum = (accumulator, currentValue) => accumulator + currentValue;
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

  getCriteria: async (req, res) => {
    try {
      const response = await Criteria.find({ deleteAt: null });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  algoTest: async (req, res) => {
    const result = [];
    const dummy = await getCriterias();
    const eMax = dummy.find((item) => item.name === 'E-max').initialWeight;
    var totalError = 1;
    var totalWeightError;
    const dataTemp = await DataTraining.find({ deleteAt: null });
    const dataLearning = [];
    dataTemp &&
      dataTemp.forEach((item) => {
        dataLearning.push(item.data);
      });

    while (totalError > eMax) {
      for (const key in dataLearning) {
        let iterations = dataLearning.length;
        const newData = await getCriterias();
        const data = newData.slice(0, 20);
        const alfa = newData.find((item) => item.name === 'alfa').initialWeight;
        const wnxn = [];
        console.log('running');
        let destination = 0;
        const items = dataLearning[key];
        const wInput = [];
        for (const i in items) {
          if (items[i].alias === 'target') {
            destination = items[i].initialWeight;
          } else {
            wnxn.push({
              alias: _.get(data[i], 'alias', ''),
              initialWeight:
                _.get(items[i], 'initialWeight', 0) *
                _.get(data[i], 'initialWeight', 0),
            });
          }
          wInput.push(items[i]);
        }
        console.log('running');
        const yIn = sumNumber(wnxn);
        const yOut = 1 / (1 + Math.exp(-yIn));
        const weightError = destination - yOut;
        const wNew = [];

        for (const keys of data) {
          const numInitial = calculateNewWeight(
            keys.initialWeight,
            alfa,
            weightError,
            destination
          );
          const update = await Criteria.findByIdAndUpdate(
            { _id: keys._id },
            { initialWeight: Number(numInitial.toFixed(2)) }
          );
          wNew.push({
            _id: keys._id,
            initialWeight: Number(numInitial.toFixed(2)),
            alias: keys.alias,
          });
        }
        if (Number(key) === iterations - 1) {
          totalWeightError = result[result.length - 1].weightError;
          let quadrat = 0;

          const iterateData =
            result.length === dataLearning.length
              ? result
              : result.slice(result.length, dataLearning.length);
          for (const key of iterateData) {
            quadrat += Math.pow(key.weightError, 2);
          }
          const totE = quadrat * 0.5;
          totalError = Number(totE.toFixed(2));
        }
        result.push({
          name: dataTemp[key].name,
          totalError,
          yIn,
          yOut: Number(yOut.toFixed(2)),
          weightError: Number(weightError.toFixed(2)),
          wnxn,
          wNew,
          wInput,
        });
      }
    }

    const oldWeight = result[0].wNew;
    const newWight = result[result.length - 1].wNew;
    for (const i in oldWeight) {
      const updated = await Criteria.findByIdAndUpdate(
        { _id: oldWeight[i]._id },
        {
          initialWeight: oldWeight[i].initialWeight,
          repairWeight: newWight[i].initialWeight,
        }
      );
    }

    res.status(200).json({
      iterations: result.length,
      dataLearning: dataLearning.length,
      result,
      data: dummy,
      totalWeightError,
    });
  },

  addDataTraining: async (req, res) => {
    const { name, data } = req.body;
    try {
      const count = await DataTraining.find({ deleteAt: null });
      const response = await DataTraining.create({
        ID: count.length + 1,
        name,
        data,
      });
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDataTraining: async (req, res) => {
    try {
      const response = await DataTraining.find({ deleteAt: null });
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDataTrainingById: async (req, res) => {
    const { _id } = req.params;
    try {
      const response = await DataTraining.findById({
        _id,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateDataTraining: async (req, res) => {
    const { _id } = req.params;
    const { name, data } = req.body;

    try {
      const response = await DataTraining.findByIdAndUpdate(
        {
          _id,
        },
        {
          name,
          data,
        }
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteDataTraining: async (req, res) => {
    const { _id } = req.params;
    try {
      const response = await DataTraining.findByIdAndRemove({
        _id,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
