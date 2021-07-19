require('dotenv').config();
const express = require('express');
//à revoir
// const corsMiddleware = require('./Back/cors');
const cors = require('cors')


const router = require('./Back/router');
const app = express();


app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));







app.use(router);

app.listen(process.env.PORT || 3000, () => {
   console.log('Server running on :', process.env.PORT);
});


