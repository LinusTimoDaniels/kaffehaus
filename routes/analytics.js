const express = require("express");
const router = express.Router();
const controller = require("../controllers/analytics.controller");

router.get('/avg-bewertung-gemeinde', controller.avgBewertungGemeinde);
router.get('/count-kanton', controller.countKanton);

module.exports = router;