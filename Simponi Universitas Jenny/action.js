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

// HTML frontend master
app.get('/homepage-master', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master.html'));
});

// HTML frontend untuk menampilkan select 'jurusan yang dipilih' - master
app.get('/homepage-master-getmajoradd', (req, res) => {
    const syntax = `
        SELECT * FROM major
    `;

    db.query(syntax, (error, result) => {
        if (error) console.log('Error: ' + error);
        res.send(result);
        console.log(`Data 'major' berhasil ditampilkan!`);
    });
});

// HTML mengirim data mahasiswa ke database - master
app.post('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/HTML/index-master.html'));

    const nama = req.body.namamahasiswa;
    const jk = req.body.gender;
    const tempatlahir = req.body.tempatl;
    const tanggallahir = req.body.tanggall;
    const stts = req.body.status;
    const pendidikant = req.body.pterakhir;
    const lastmajor = req.body.jurusanpterakhir;
    const emailm = req.body.email;
    const address = req.body.alamat;
    const handphone = req.body.hp;
    const takenmajor = req.body.jurusanambil;
    const sp = req.body.programstudi;
    const smstr = req.body.semester;
    const photo = req.body.foto;
    const year = new Date().getFullYear();
    var numberjur = 0;

    if (takenmajor == 1) {
        numberjur = 25;
    }
    else if (takenmajor == 2) {
        numberjur = 24;
    }
    else if (takenmajor == 3) {
        numberjur = 23;
    }

    const syntax1 = `
        INSERT INTO user_login (email, password, rule_id) VALUES ('${emailm}', 'simponi123', 3)
    `;

    db.query(syntax1, (error) => {
        if (error) console.log('Error: ' + error); 
        console.log('Data user_login berhasil diinput!');
    });

    const syntax2 = `
    INSERT INTO student_identity (user_login_email, nim, name, gender, country, date_birth, address, status, number_phone, last_education, major_last_education, major_id, study_program, semester, photo) 
    VALUES ( 
        '${emailm}',
        (CONCAT(${year}, ${numberjur})*10000) +
        (SELECT nomor + 1 FROM (
            SELECT COALESCE(
                SUM(
                    CASE
                        WHEN major_id = '${takenmajor}' THEN 1
                    END
                ), 0) 
            nomor FROM student_identity) 
        alias),
        '${nama}',
        '${jk}',
        '${tempatlahir}',
        '${tanggallahir}',
        '${address}',
        '${stts}',
        '${handphone}',
        '${pendidikant}',
        '${lastmajor}',
        '${takenmajor}',
        '${sp}',
        '${smstr}',
        '${photo}'
    )`;

    db.query(syntax2, (error) => {
        if (error) console.log('Error: ' + error); 
        console.log('Data student_identity berhasil diinput!');
    });
});

// HTML dosen
app.get('/homepage-lecturer', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-dosen.html'));
});

// HTML mahasiswa
app.get('/homepage-student', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-mahasiswa.html'));
});

module.exports = app;