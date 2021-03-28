const Technician = require("../models/Technician");
const hash = require("../helpers/hash");

module.exports = {
  addTechnician: (req, res) => {
    Technician.findOne({
      username: req.body.username,
    })
      .then((response) => {
        if (response === null) {
          Technician.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            address: req.body.address,
            contact: req.body.contact,
          })
            .then((result) => {
              res.status(201).json({
                err: false,
                message: `Success add ${result.name}`,
                data: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message: `Please input incorrect`,
              });
            });
        } else {
          res.status(400).json({
            message: "username already registered!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          data: err,
          msg: `Error Server`,
        });
      });
  },

  loginTechnician: (req, res) => {
    let password = req.body.password;
    Technician.findOne({
      username: req.body.username,
    })
      .then((result) => {
        if (result.length !== 0) {
          if (hash.decode(password, result.password)) {
            res.status(200).json({
              err: false,
              msg: `Success login`,
              name: result.name,
              role: result.role,
              id: result._id,
              token: hash.jwtEncode({
                id: result._id,
                username: result.username,
              }),
            });
          } else {
            res.status(400).json({
              message: `Wrong password`,
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).json({
          err: err,
          message: `User not register`,
        });
      });
  },

  getTechnician: (req, res) => {
    Technician.findById({
      _id: req.decoded.id,
    })
      .then((result) => {
        let user = {
          username: result.username,
          _id: result._id,
          role: result.role,
        };
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  editTechnician: (req, res) => {
    Technician.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        contact: req.body.contact,
      }
    )
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteTechnician: (req, res) => {
    Technician.findByIdAndRemove({
      _id: req.params.id,
    })
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
