const express = require('express');
const router = express.Router();
const { isLogin, isAdmin } = require('../middlewares/auth');
const {
  addCriteria,
  getCriteria,
  updateCriteria,
  deleteCriteria,
  algoTest,
} = require('../controllers/criteria-controller');

router.post('/', isLogin, isAdmin, addCriteria);
router.get('/', isLogin, isAdmin, getCriteria);
router.get('/test', isLogin, isAdmin, algoTest);
router.put('/:_id', isLogin, isAdmin, updateCriteria);
router.delete('/:_id', isLogin, isAdmin, deleteCriteria);

module.exports = router;
