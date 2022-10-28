const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const db = require('./connection');
const port = 3000;

app.use(bodyparser.urlencoded ({ 
    extended: false //kirim form dari html, pakai false 
}));

app.use(bodyparser.json());

app.get('/user', (req, res) => {
    res.sendFile('./HTML/index-master.html');
});

//membaca server
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});