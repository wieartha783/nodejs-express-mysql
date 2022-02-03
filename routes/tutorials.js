var express = require('express');
const { tutorials } = require('../app/controllers');
var router = express.Router();

/* GET tutorials listing. */
router.get('/', tutorials.getDataTutorials);
router.get('/getbyid/:id',  tutorials.getDataTutorialsById);

router.post('/create',  tutorials.createDataTutorials);


module.exports = router;