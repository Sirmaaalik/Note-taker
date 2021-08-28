const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoute = require('./miniature-eureka/Develop/routes/api');
const htmlRoute = require('./miniature-eureka/Develop/routes/html');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// app.use("/api", apiRoute);

app.use("/", htmlRoute);

app.listen(PORT, () => {
    console.log('App listening on port: ${PORT}');
});