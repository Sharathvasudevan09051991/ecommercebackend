const express = require('express');
const router = express.Router();
const {categoryValidator} = require('../validators')


//controller
const {create, read, update, remove, list} = require('../controllers/category'); 


//routes
router.post('/create',  create);
router.get('/list',  list);
router.get('/read/:slug',  read);
router.put('/update/:slug',  update);
router.delete('/remove/:slug',  remove);


module.exports = router