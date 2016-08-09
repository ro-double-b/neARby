var router = require('express').Router();
var controller = require('./controller');

router.post('location', controller.getPlaces);

module.exports = router;
