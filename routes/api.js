var express = require('express');
var router = express.Router();
var ShippingController = require('../controllers/ShippingController'); //Retornando para a pasta raiz para acessar Controllers.

/* GET home page. */
router.post('/shippings', function(req, res, next) { // Criando uma URL.
	ShippingController.postShipping(req, res, next);
});

router.get('/shippings', function(req, res, next) { // (MÉTODO) req - dados enviados pro servidor. res - formato no qual você entregaa requisição (json, view, etc).
	ShippingController.getShipping(req, res, next);
});


module.exports = router;
