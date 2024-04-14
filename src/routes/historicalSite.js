const historicalSiteController = require("../controllers/historicalSiteController");

const router = require("express").Router();

router.post("/", historicalSiteController.addHistoricalSite);

module.exports = router;