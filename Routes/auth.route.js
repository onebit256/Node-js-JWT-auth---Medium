const router = require('express').Router()
const signup = require('../Controller/auth.controller')
const {validateUser} = require('../Middleware/validation');

router.post('/signup',validateUser,signup.signup)

module.exports = router