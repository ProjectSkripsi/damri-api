const Bus = require("../models/Bus");

module.exports = {
  addBus: (req, res) => {
    Bus.find({
      idBus: req.body.idBus,
    })
      .then((result) => {
        if (result.length === 0) {
          Bus.create({
            idBus: req.body.idBus,
            vechileType: req.body.vechileType,
            policeNo: req.body.policeNo,
            imageUrl: req.body.imageUrl,
          })
            .then((response) => {
              res.status(201).json({
                data: response,
                msg: `Success Add bus`,
              });
            })
            .catch((err) => {
              res.status(203).json({
                message: `Please input data required`,
              });
            });
        } else {
          res.status(400).json({
            message: "idBus already registered!",
          });
        }
      })
      .catch((err) => {
        res.status(404).json({
          err: err,
          msg: `Error Server`,
        });
      });
  },

  findBus: (req, res) => {
    Bus.findById({
      _id: req.params.id,
    })
      .populate("inspectionBy")
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  findAll: (req, res) => {
    Bus.find({})
      .populate("inspectionBy")
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteBus: (req, res) => {
    Bus.findByIdAndRemove({
      _id: req.params.id,
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  editBus: (req, res) => {
    Bus.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        idBus: req.body.idBus,
        vechileType: req.body.vechileType,
        policeNo: req.body.policeNo,
      }
    )
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  updateInspection: (req, res) => {
    Bus.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        firstAid: req.body.firstAid,
        frontPlate: req.body.frontPlate,
        rearPlate: req.body.rearPlate,
        inspectionBook: req.body.inspectionBook,
        spareTire: req.body.spareTire,
        headLightRight: req.body.headLightRight,
        headLightLeft: req.body.headLightLeft,
        frontFlaserLightRight: req.body.frontFlaserLightRight,
        frontFlaserLightLeft: req.body.frontFlaserLightLeft,
        rearFlaserLightRight: req.body.rearFlaserLightRight,
        rearFlaserLightLeft: req.body.rearFlaserLightLeft,
        stopLightRight: req.body.stopLightRight,
        stopLightLeft: req.body.stopLightLeft,
        backupLightRight: req.body.backupLightRight,
        backupLightLeft: req.body.backupLightLeft,
        platLight: req.body.platLight,
        hazardLight: req.body.hazardLight,
        horn: req.body.horn,
        safetyBeltFront: req.body.safetyBeltFront,
        safetyBeltBack: req.body.safetyBeltBack,
        handBreake: req.body.handBreake,
        cabinMirror: req.body.cabinMirror,
        fireExtiungiser: req.body.fireExtiungiser,
        jack: req.body.jack,
        jackHandle: req.body.jackHandle,
        tireWrech: req.body.tireWrech,
        fanBelt: req.body.fanBelt,
        triangle: req.body.triangle,
        cutterMirrorRight: req.body.cutterMirrorRight,
        cutterMirrorLeft: req.body.cutterMirrorLeft,
        engineOil: req.body.engineOil,
        radiatorCooling: req.body.radiatorCooling,
        brakeOil: req.body.brakeOil,
        wiperWater: req.body.wiperWater,
        liquidBAttery: req.body.liquidBAttery,
        airConditioner: req.body.airConditioner,
        tirePreasureTester: req.body.tirePreasureTester,
        tirePreasureFront: req.body.tirePreasureFront,
        tirePreasureRear: req.body.tirePreasureRear,
        others: req.body.others,
        status: true,
        inspectionBy: req.decoded.id,
      }
    )
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  findStatus: (req, res) => {
    Bus.find({
      status: true,
    })
      .populate("inspectionBy")
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  worthy: (req, res) => {
    Bus.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        result: "Layak Jalan",
      }
    )
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  notWorthy: (req, res) => {
    Bus.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        result: "Tidak Layak Jalan",
      }
    )
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  getBuses: async (req, res) => {
    Bus.find({})
      .populate("inspectionBy")
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
