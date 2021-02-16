const User = require("../models/User");
const hash = require("../helpers/hash");

module.exports = {
  signin: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username })
      .then((result) => {
        if (hash.decode(password, result.password)) {
          res.status(200).json({
            err: false,
            msg: `Succesfully Login`,
            username: result.username,
            role: result.role,
            id: result._id,
            token: hash.jwtEncode({
              id: result._id,
              username: result.username,
              role: result.role,
            }),
          });
        } else {
          res.status(400).json({
            message: "Password is wrong",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          err: err,
          msg: `Uset not register`,
        });
      });
  },

  signup: (req, res) => {
    const { username, password, name, address, contact } = req.body;
    console.log("====================================");
    console.log(req.body);
    console.log("====================================");
    User.find({ username })
      .then((result) => {
        if (result.length === 0) {
          User.create({
            username,
            password,
            name,
            address,
            contact,
          })
            .then((newUser) => {
              res.status(201).json({
                err: false,
                message: `Success to add ${newUser.username}`,
                data: newUser,
              });
            })
            .catch((err) => {
              res.status(403).json({
                message: `Please input name & password incorrect`,
                err,
              });
            });
        } else {
          res.status(400).json({
            message: "username already registered!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  getUser: (req, res) => {
    User.findById({
      _id: req.decoded.id,
    })
      .then((result) => {
        let user = {
          name: result.name,
          address: result.address,
          contact: result.contact,
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

  getAll: (req, res) => {
    User.find({
      role: "member",
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  removeUser: (req, res) => {
    User.findByIdAndDelete({
      _id: req.params.id,
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
