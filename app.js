require('dotenv').config();
const express = require('express');
const cors = require('cors')

const router = require('./Back/router');
const app = express();

const corsOptions = {
   origin: 'http://localhost:8080',
   'allowedHeaders': ['Content-Type'],
   'methods': 'GET',
 }
 app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 3000, () => {
   console.log('Server running on :', process.env.PORT);
});


