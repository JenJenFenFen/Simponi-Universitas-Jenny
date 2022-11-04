const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./connectiondb');

app.use(bodyparser.urlencoded ({ 
    extended: false //kirim form dari html, pakai false 
}));

app.use(bodyparser.json());

// koneksi ke file css dan js
app.use(express.static(path.join(__dirname, 'library')));
app.use(express.static(path.join(__dirname, 'function')));

// HTML  frontend master
app.get('/homepage-master', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master.html'));
});

// // HTML send students datas to database - master
// app.post('/homepage-master-addstudent', (req, res) => {
//     // res.sendFile(path.join(__dirname, '/HTML/index-master.html'));

//     const nama = req.body.namamahasiswa;
//     const jk = req.body.gender;
//     const tempatlahir = req.body.tempatl;
//     const tanggallahir = req.body.tanggall;
//     const stts = req.body.status;
//     const pendidikant = req.body.pterakhir;
//     const lastmajor = req.body.jurusanpterakhir;
//     const emailm = req.body.email;
//     const address = req.body.alamat;
//     const handphone = req.body.hp;
//     const takenmajor = req.body.jurusanambil;
//     const smstr = req.body.semester;
//     const photo = req.body.foto;
//     const year = new Date().getFullYear();
//     var numberjur = 0;

//     if (jurusan == 'Teknik Informatika') {
//         numberjur = 25;
//     }
//     else if (jurusan == 'Sistem Informasi') {
//         numberjur = 24;
//     }
//     else if (jurusan == 'Teknik Komputer') {
//         numberjur = 23;
//     }

//     const syntax1 = `
//         INSERT INTO user_login (email, password, rule_id) VALUES ('${emailm}', 'simponi123', 3)
//     `;

//     db.query(syntax1, (error) => {
//         if (error) res.send('Error: ' + error); 
//         res.send('Data user_login berhasil diinput!');
//     });

//     const syntax2 = `
//     INSERT INTO student_identity (user_login_email, nim, name, gender, country, date_birth, address, status, number_phone, last_education, major_last_education, ) 
//     VALUES ( 
//         '${nama}', 
//         '${jurusan}',
//         (CONCAT(${year}, ${numberjur})*10000) +
//         (SELECT nomor + 1 FROM (
//             SELECT COALESCE(
//                 SUM(
//                     CASE
//                         WHEN major = '${jurusan}' THEN 1
//                     END
//                 ), 0) 
//             nomor FROM testinput) 
//         alias)
//     )`;

//     db.query(syntax2, (error) => {
//         if (error) res.send('Error: ' + error); 
//         res.send('Data user_login berhasil diinput!');
//     });
// });

// HTML dosen
app.get('/homepage-lecturer', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-dosen.html'));
});

// HTML mahasiswa
app.get('/homepage-student', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-mahasiswa.html'));
});

module.exports = app;