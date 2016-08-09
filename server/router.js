var router = require('express').Router();
var controller = require('./controller/controller');

router.get('location', controller.getPlaces);

module.exports = router;
