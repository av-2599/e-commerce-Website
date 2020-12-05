const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const postRouter = require('./Routes/postRouter');
const getRouter = require('./Routes/getRouter');
const deleteRouter = require('./Routes/deleteRouter');
const patchRouter = require('./Routes/patchRouter');
const config = require('../config/config');

mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/', postRouter);
    app.use('/', getRouter);
    app.use('/', deleteRouter);
    app.use('/', patchRouter);
    app.listen(4000, () => {
        console.log("App listening on port 4000!");
    });
}, reason => {
    console.log(reason);
});
