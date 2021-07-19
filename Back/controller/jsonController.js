const axios = require('axios');
const { json } = require('express');

const jsonController = {
    async getAirport(_, response, next) {
        try {
            const callToFindAirport = await axios.get('https://www.cloudping.cloud/cloudfront-edge-locations.json');
            console.log(callToFindAirport.data.nodes);

            response.json(callToFindAirport.data.nodes)
            
        } catch (error) {
            next(error);
        };
    }
}
module.exports = jsonController;
