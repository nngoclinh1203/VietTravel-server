const historicalSiteController = require("../controllers/historicalSite");

const router = require("express").Router();

router.post("/", historicalSiteController.addHistoricalSite);

module.exports = router;