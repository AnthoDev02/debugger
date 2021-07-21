const axios = require('axios');
const codeFlag = require('../../Front/src/Data/code.json');

const urlController = {
    async getHeadersByUrl(request, response) {
        try {
            const url = request.body.url.search;

            // récupération des headers et gestion du code du paramètre cloudfrontPOP
            const callToFindHeaders = await axios.get(url);
            const codeCloudFrontPop = callToFindHeaders.headers['x-amz-cf-pop']?.substring(0, 3)

            // récupération de l'objet Json
            const callToFindAirport = await axios.get('https://www.cloudping.cloud/cloudfront-edge-locations.json');
            const jsonResult = callToFindAirport.data.nodes;

            // objet renvoyé au front
            const result = {
                plugged: callToFindHeaders.headers.server === 'fasterize' ? true : false,
                statusCode: callToFindHeaders.status,
                fstrzFlags: codeFlag[callToFindHeaders.headers['x-fstrz']],
                cloudfrontStatus: callToFindHeaders.headers['x-cache']?.split(' ')[0].toUpperCase(),
                cloudfrontPOP: jsonResult[codeCloudFrontPop]?.country
            }
            
            response.json(result);

        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = urlController;