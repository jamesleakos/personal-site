const mongoose = require('mongoose');
const Visit = require('../../db/models/Visit.js');
const User = require('../../db/models/User.js');

exports.track = async (req, res) => {
    try {
        const visitData = {
            pageVisited: req.params.page_name,
            path: '/page' + req.path,
            ip: req.ip,
            sub_id: !!req.body.sub_id ? req.body.sub_id : null,
            sub_name: !!req.body.sub_name ? req.body.sub_name : null,
        };

        // If email is provided, find the user and link the visit to them
        if (req.user) {
            visitData.user = req.user._id;
        }

        // Save the visit
        const visit = new Visit(visitData);
        await visit.save();

        // Send a success response
        res.status(200).send({ message: 'Page returned: ' + visitData.pageVisited });
    } catch (error) {
        console.log('error', error);
        res.status(500).send({ message: 'Error' });
    }
};