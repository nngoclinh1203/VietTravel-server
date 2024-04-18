const HistoricalSite = require('../model/historicalSites');

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

        const { name, address, images, content, coordinates } = req.body;

        if (!name || !address || !content || !coordinates)
            return res.status(400).json({ message: "All input is required!" });

        const historicalSite = new HistoricalSite({
            name,
            address,
            images,
            content,
            coordinates
        });

        await historicalSite.save();
        res.status(201).json({ message: "Historical Site created successfully!" });


    } catch (err) {
        res.status(500).json(err);
    }
}

//role:admin
//api/historicalSites/update-historical-site/:id
exports.updateHistoricalSite = async (req, res) => {
    try {
        const updateFields = {};
        const { name, address, images, content, coordinates } = req.body;

        if (name) updateFields.name = name;
        if (address) updateFields.address = address;
        if (images) updateFields.images = images;
        if (content) updateFields.content = content;
        if (coordinates) updateFields.coordinates = coordinates;

        const historicalSite = await HistoricalSite.findOneAndUpdate(
            { historySiteId: req.params.id },
            { $set: updateFields },
            { new: true }
        );

        if (!historicalSite) return res.status(404).json({ message: "Historical Site not found!" });

        res.status(200).json({ message: "Historical Site updated successfully!", historicalSite });

    } catch (err) {
        res.status(500).json(err);
    }
};
