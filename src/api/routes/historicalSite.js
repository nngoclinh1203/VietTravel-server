const historicalSiteController = require("../controllers/historicalSite");

const router = require("express").Router();

router.get("/all-historical-sites", historicalSiteController.getAllHistoricalSite);
router.get("/:historicalSiteId", historicalSiteController.getHistoricalSites);
router.post("/add-historical-site", historicalSiteController.addHistoricalSite);
router.patch("/update-historical-site/:historySiteId", historicalSiteController.updateHistoricalSite);
router.delete("/delete-historical-site/:historySiteId", historicalSiteController.deleteHistoricalSite);

module.exports = router;