const express = require("express");
const router = express.Router();
const { isLogin, isAdmin } = require("../middlewares/auth");
const {
  signin,
  signup,
  getUser,
  getAll,
  removeUser,
  addTechnician,
  updateTech,
} = require("../controllers/user-controller");

router.post("/add-technician", isLogin, isAdmin, addTechnician);
router.post("/update-technician/:_id", isLogin, isAdmin, updateTech);
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", isLogin, getUser);
router.get("/all", isLogin, isAdmin, getAll);
router.delete("/:id", isLogin, isAdmin, removeUser);

module.exports = router;
