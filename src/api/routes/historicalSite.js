const historicalSiteController = require("../controllers/historicalSite");

const router = require("express").Router();

router.get("/:historicalSiteId", historicalSiteController.getHistoricalSites);
router.post("/add-historical-site", historicalSiteController.addHistoricalSite);
router.patch("/update-historical-site/:id", historicalSiteController.updateHistoricalSite);

module.exports = router;