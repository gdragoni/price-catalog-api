const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

const MarketController = require('./controller/Market');

app.get('/produto', MarketController.find);

app.post('/produto/add', MarketController.store)

mongoose.connect(process.env.MONGOLAB_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log("MongoDB succefully"));

app.listen(process.env.PORT || 3000, () => console.log('Is running'));