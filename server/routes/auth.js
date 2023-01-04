const express = require('express')
const router = express.Router()

const {Login, LogOut} = require('../controllers/auth')
const { authorization } = require('../middlewares/authenticate')

router.post('/login',Login)
router.get('/logout',authorization ,LogOut)

module.exports = router