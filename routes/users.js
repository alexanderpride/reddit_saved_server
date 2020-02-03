const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/auth_link', userController.auth_link);

router.get('/link', userController.link);

router.get('/test_session', userController.test_auth_link);


module.exports = router;
