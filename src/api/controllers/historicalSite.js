const HistoricalSite = require('../model/historicalSites');
const { v4: uuidv4 } = require('uuid');

//role: visitor, user
//api/historicalSites/all-historical-sites
exports.getAllHistoricalSite = async (req, res) => {
    try {
        const historicalSites = await HistoricalSite.find();
        res.status(200).json(historicalSites);
    } catch (err) {
        res.status(500).json(err);
    }
}

//role:visitor, user, admin
//api/historicalSites/:id
exports.getHistoricalSites = async (req, res) => {
    try {
        const historicalSiteId = req.params.historicalSiteId;

        const historicalSites = await HistoricalSite.findOne({ historySiteId: historicalSiteId });

        if (!historicalSites) return res.status(404).json({ message: "Historical Site not found!" });

        res.status(200).json(historicalSites);
    } catch (err) {
        res.status(500).json(err);
    }
}


//role:admin
//api/historicalSites/add-historical-site
exports.addHistoricalSite = async (req, res) => {
    try {

        const { name, images, summary, description, location } = req.body;

        if (!name || !summary || !description || !location)
            {
                if (!name) return res.status(400).json({ message: "Name is required!" });
                if (!summary) return res.status(400).json({ message: "Summary is required!" });
                if (!description) return res.status(400).json({ message: "Description is required!" });
                if (!location) return res.status(400).json({ message: "Location is required!" });
            }

        const historicalSite = new HistoricalSite({
            historySiteId: uuidv4(),
            name,
            summary,
            images,
            description,
            location
        });

        await historicalSite.save();
        res.status(201).json({ message: "Historical Site created successfully!" });


    } catch (err) {
        res.status(500).json(err);
    }
}

//role:admin
//api/historicalSites/update-historical-site/:historySiteId
exports.updateHistoricalSite = async (req, res) => {
    try {
        const updateFields = {};
        const { name, images, summary, description, location} = req.body;

        if(name) updateFields.name = name;
        if(images) updateFields.images = images;
        if(summary) updateFields.summary = summary;
        if(description) updateFields.description = description
        if(location) updateFields.location = location;


        const historicalSite = await HistoricalSite.findOneAndUpdate(
            { historySiteId: req.params.historySiteId },
            { $set: updateFields },
            { new: true }
        );

        if (!historicalSite) return res.status(404).json({ message: "Historical Site not found!" });

        res.status(200).json({ message: "Historical Site updated successfully!", historicalSite });

    } catch (err) {
        res.status(500).json(err);
    }
};

//role:admin
//api/historicalSites/delete-historical-site/:historySiteId
exports.deleteHistoricalSite = async (req, res) => {
    try {
        const historicalSite = await HistoricalSite.findOneAndDelete({ historySiteId: req.params.historySiteId });

        if (!historicalSite) return res.status(404).json({ message: "Historical Site not found!" });

        res.status(200).json({ message: "Historical Site deleted successfully!" });

    } catch (err) {
        res.status(500).json(err);
    }
}
