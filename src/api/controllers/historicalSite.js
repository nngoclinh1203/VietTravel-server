const HistoricalSite = require('../model/historicalSites');

const historicalSiteController = {
    addHistoricalSite: async (req, res) => {
        try {
            const newHistoricalSite = new HistoricalSite(req.body);
            const savedHistoricalSite = await newHistoricalSite.save();
            res.status(200).json(savedHistoricalSite);

        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = historicalSiteController;