const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');


/* GET home page. */
router.get('/', contentController.getDefault);



module.exports = router;
