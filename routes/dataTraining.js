const express = require('express');
const router = express.Router();
const { isLogin, isAdmin } = require('../middlewares/auth');
const {
  addDataTraining,
  getDataTraining,
  getDataTrainingById,
  updateDataTraining,
  deleteDataTraining,
} = require('../controllers/criteria-controller');

router.post('/', isLogin, isAdmin, addDataTraining);
router.get('/', isLogin, isAdmin, getDataTraining);
router.get('/:_id', isLogin, isAdmin, getDataTrainingById);
router.put('/:_id', isLogin, isAdmin, updateDataTraining);
router.delete('/:_id', isLogin, isAdmin, deleteDataTraining);

module.exports = router;
