const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {authValidator} = require('../validators');
const {signIn, authToken} =  require('../controllers/user');

router.post('/', authValidator, signIn);
router.get('/', auth,  authToken);



module.exports = router;