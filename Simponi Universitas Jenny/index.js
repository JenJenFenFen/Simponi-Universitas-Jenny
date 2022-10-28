const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./connection');
const port = 3000;

app.use(bodyparser.urlencoded ({ 
    extended: false //kirim form dari html, pakai false 
}));

app.use(bodyparser.json());

//css
app.use("/library", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

//jquery
app.use("/library", express.static(path.join(__dirname, "node_modules/jquery/dist")));

//bootstrap
app.use("/library",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

//sidebars
// app.use("/library", express.static(path.join(__dirname, "node_modules/bootstrap-sidebar/dist/css")));
// app.use("/library", express.static(path.join(__dirname, "node_modules/bootstrap-sidebar/dist/js")));

//jbvalidator
app.use("/library", express.static(path.join(__dirname, "node_modules/@emretulek/jbvalidator/dist")));

app.get('/homepage-master', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master.html'));
});

//membaca server
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});