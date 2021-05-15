const express = require("express");
const router = express.Router();

const {signup} = require("../controllers/user");
const {userSignUpValidator} = require('../validators')

router.post('/',  userSignUpValidator ,  signup); 

module.exports = router;