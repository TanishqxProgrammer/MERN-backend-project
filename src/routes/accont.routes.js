const express = require('express');
const authMiddleware = require('../middleware/auth.middlware')
const accountController= require('../controller/account.controller')


const router = express.Router();    


router.post('/', authMiddleware.authMiddleware, accountController.createAccount)


module.exports = router;