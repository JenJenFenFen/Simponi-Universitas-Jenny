// const express = require('express');
// const app = express();
// const bodyparser = require('body-parser');
// const path = require('path');
const app = require('./action');
const port = 3000;

// // koneksi ke file css dan js
// app.use(express.static(path.join(__dirname, 'library')));
// app.use(express.static(path.join(__dirname, 'function')));

// // HTML master
// app.get('/homepage-master', (req, res) => {
//     res.sendFile(path.join(__dirname, '/HTML/index-master.html'));
// });

// // HTML dosen
// app.get('/homepage-lecturer', (req, res) => {
//     res.sendFile(path.join(__dirname, '/HTML/index-dosen.html'));
// });

// // HTML mahasiswa
// app.get('/homepage-student', (req, res) => {
//     res.sendFile(path.join(__dirname, '/HTML/index-mahasiswa.html'));
// });

// membaca port
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});