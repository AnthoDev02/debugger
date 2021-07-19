const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET'],
 };

 module.exports = cors(corsOptions);