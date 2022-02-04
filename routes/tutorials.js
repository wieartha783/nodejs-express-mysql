var express = require('express');
const { tutorials } = require('../app/controllers');
const { generate64 } = require('../app/controllers')
var router = express.Router();

/* GET tutorials listing. */
router.get('/', tutorials.getDataTutorials);
router.get('/getbyid/:id',  tutorials.getDataTutorialsById);

router.post('/create',  tutorials.createDataTutorials);
router.post('/update/:id',  tutorials.updateDataTutorialsById);

router.get('/generate64',generate64.generateKey);

module.exports = router;