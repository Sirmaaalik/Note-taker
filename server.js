const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoute = require('./Develop/routes/api');
const htmlRoute = require('./Develop/routes/html');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Develop/public")));

app.use("/api", apiRoute);

app.use("/", htmlRoute);

app.listen(PORT, () => {
    console.log('App listening on port: ${PORT}');
});

