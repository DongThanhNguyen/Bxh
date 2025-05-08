const express = require('express');
const router = express.Router();
const controller = require('../controller/matchController');

router.get('/matches', controller.getMatches);
router.post('/matches', controller.updateMatchResult);
router.get('/standings', controller.getStandings);

module.exports = router;
