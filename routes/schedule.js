const express = require("express");
const router = express.Router();
const { isLogin, isAdmin } = require("../middlewares/auth");
const {
  addSchedule,
  getSchedule,
  deleteSchedule,
  getScheduleById,
  updateSchedule,
} = require("../controllers/schedule-controller");

router.put("/:id", isLogin, isAdmin, updateSchedule);
router.get("/:id", getScheduleById);
router.get("/", getSchedule);
router.delete("/:id", isLogin, isAdmin, deleteSchedule);
router.post("/add", isLogin, isAdmin, addSchedule);
module.exports = router;
