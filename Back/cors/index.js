const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:9852',
    methods: ['GET'],
    'Access-Control-Allow-Origin': 'http://localhost:9852'
 };

 module.exports = cors(corsOptions);