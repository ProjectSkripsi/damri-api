const express = require('express')
const router = express.Router()
const {isLogin, isAdmin, isTechnician} = require('../middlewares/auth')
const {addTechnician, loginTechnician, getTechnician, deleteTechnician, editTechnician} = require('../controllers/techician-controller')

router.post('/register', isLogin, isAdmin, addTechnician)
router.put('/:id', isLogin, isAdmin, editTechnician)
router.delete('/:id', isLogin, isAdmin, deleteTechnician)
router.post('/login', loginTechnician)
router.get('/', isTechnician ,getTechnician)

module.exports = router