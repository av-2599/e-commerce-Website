const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const registrationRouter = require('./Routes/postRouter');

const mongoURL = 'mongodb+srv://adiviswa:Blastingdiapers1-@zeus.wyvkg.azure.mongodb.net/test';

mongoose.connect(mongoURL , {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/', registrationRouter);
    app.listen(3000, () => {
        console.log("App listening on port 3000!");
    });
}, reason => {
    console.log(reason);
});
