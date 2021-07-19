const { default: axios } = require('axios');

const urlController = {
    async getHeadersByUrl(request, response, next) {
        try {
            const url = request.body.url.search;

            const callToFindHeaders = await axios.get(url);

            if (!url) {

                response.locals.notFound ="url not found"
                next()
                return;
            }
            delete callToFindHeaders.data;

            const result = {
                plugged: callToFindHeaders.headers.server === 'fasterize' ? true : false,
                statusCode: callToFindHeaders.status,
                fstrzFlags: callToFindHeaders.headers['x-fstrz'],
                cloudfrontStatus: callToFindHeaders.headers['x-cache']?.split(' ')[0].toUpperCase(),
                cloudfrontPOP: callToFindHeaders.headers['x-amz-cf-pop'].substring(0, 3)
            }
            console.log('result:',result);
            response.json(result);

        } catch (error) {
            next(error);
        }
    }
};

module.exports = urlController;