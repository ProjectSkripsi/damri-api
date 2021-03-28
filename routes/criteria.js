const express = require("express");
const router = express.Router();
const { isLogin, isAdmin } = require("../middlewares/auth");
const {
  addCriteria,
  getCriteria,
  updateCriteria,
  deleteCriteria,
} = require("../controllers/criteria-controller");

router.post("/", isLogin, isAdmin, addCriteria);
router.get("/", isLogin, isAdmin, getCriteria);
router.put("/:_id", isLogin, isAdmin, updateCriteria);
router.delete("/:_id", isLogin, isAdmin, deleteCriteria);

module.exports = router;
