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

//koneksi ke file css dan js
app.use(express.static(path.join(__dirname, "library")));

app.get('/homepage-master', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master.html'));
});

//membaca port
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});