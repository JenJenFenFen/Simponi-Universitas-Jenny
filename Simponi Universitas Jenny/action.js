const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./connectiondb');

app.use(bodyparser.urlencoded ({ 
    extended: false //kirim form dari html, pakai false 
}));

app.use(bodyparser.json());

// koneksi ke file html, css, dan js
app.use(express.static(path.join(__dirname, 'library')));
app.use(express.static(path.join(__dirname, 'function')));

// HTML frontend master
app.get('/homepage-master', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master-homepage.html'));
});

// HTML frontend master - add lecturer
app.get('/homepage-master-addlecturer', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master-daftardosen.html'));
});

// HTML frontend master - add student
app.get('/homepage-master-addstudent', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master-daftarmahasiswa.html'));
});

// HTML frontend master - update student
app.get('/homepage-master-updatestudent', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master-updatemahasiswa.html'));
});

// HTML frontend master - update lecturer
app.get('/homepage-master-updatelecturer', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master-updatedosen.html'));
});

// HTML frontend master - add class
app.get('/homepage-master-addclass', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master-membuatkelas.html'));
});

// HTML frontend master - add material schedule
app.get('/homepage-master-addmaterialsch', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML/index-master-membuatmk.html'));
});

// HTML frontend untuk menampilkan select 'program studi' - master
app.get('/homepage-master-getstudyprogramadd', (req, res) => {
    const syntax = `
        SELECT * FROM study_program
    `;

    db.query(syntax, (error, result) => {
        if (error) console.log('' +error);
        else {
            res.send(result);
            console.log(`Data 'Program Studi' berhasil ditampilkan!`);
        }
    });
});

app.set('views', '/html');

// HTML frontend untuk menampilkan select 'jurusan yang diambil' - master
app.get('/homepage-master-getmajoradd', (req, res) => {
    const studyid = req.query.programstudi;
    const syntax = `
        SELECT id, major_name FROM major WHERE study_program_id = ${studyid}
    `;

    // console.log(studyid);

    db.query(syntax, (error, result) => {
        if (error) console.log('' +error);
        else {
            res.send(result);
            console.log(`Data 'Jurusan yang Diambil' berhasil ditampilkan!`);
        }
    });
});

// HTML mengirim data mahasiswa ke database - master
app.post('/homepage-master-inputnewmhs', (req, res) => {
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
    const smstr = req.body.semester;
    const photo = req.body.foto;
    const year = new Date().getFullYear();
    var numberjur = 0;

    if (takenmajor == 1 || takenmajor == 4) {
        numberjur = 25;
    }
    else if (takenmajor == 2 || takenmajor == 5) {
        numberjur = 24;
    }
    else if (takenmajor == 3) {
        numberjur = 23;
    }

    console.log(nama, emailm);

    const syntax = `
        INSERT INTO user_login (email, password, rule_id) VALUES ('${emailm}', 'simponi123', 3);

        INSERT INTO student_identity (user_login_email, nim, name, gender, country, date_birth, address, status, number_phone, last_education, major_last_education, major_id, semester, photo) 
        VALUES ( 
            '${emailm}',
            (CONCAT(${year}, ${numberjur})*10000) +
                (SELECT nomor + 1 FROM (
                    SELECT COALESCE(
                        SUM(
                            CASE
                                WHEN nim LIKE '${year}${numberjur}%' THEN 1
                            END
                        )
                    , 0) 
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
            '${smstr}',
            '${photo}'
        );
    `;

    db.query(syntax, (error) => {
        if (error) {
            console.log('' +error);
            res.status(400).send('' +error);
        } 
        else {
            console.log(`Data 'Mahasiswa' berhasil diinput!!!`);
            res.status(200).send(`Data 'Mahasiswa' berhasil diinput!!!`);
        }
    });
});

// HTML frontend untuk menampilkan select 'mahasiswa' untuk penambahan kelas - master
app.get('/homepage-master-getmhsadd', (req, res) => {
    const majorid = req.query.jurusan;
    const syntax = `
        SELECT id, name FROM student_identity WHERE major_id = ${majorid} 
    `;

    // console.log(majorid);

    db.query(syntax, (error, result) => {
        if (error) console.log('' +error);
        else {
            res.send(result);
            console.log(`Data 'Mahasiswa' berhasil ditampilkan!`);
        }
    });
});

// HTML mengirim data dosen ke database - master
app.post('/homepage-master-inputnewdsn', (req, res) => {
    const nama = req.body.namadosen;
    const jk = req.body.gender;
    const tempatlahir = req.body.tempatl;
    const tanggallahir = req.body.tanggall;
    const stts = req.body.status;
    const pendidikant = req.body.pterakhir;
    const lastmajor = req.body.jurusan;
    const emaild = req.body.email;
    const address = req.body.alamat;
    const handphone = req.body.hp;
    const photo = req.body.foto;
    const year = new Date().getFullYear();
    var numberdsn = 11;

    const syntax1 = `
        INSERT INTO user_login (email, password, rule_id) VALUES ('${emaild}', 'simponi123', 2)
    `;

    db.query(syntax1, (error) => {
        if (error) console.log('' +error); 
        else console.log('Data user_login berhasil diinput!');
    });

    const syntax2 = `
    INSERT INTO lecturer_identity (user_login_email, nid, name, gender, country, date_birth, address, status, number_phone, last_education, major_last_education, photo) 
    VALUES ( 
        '${emaild}',
        (CONCAT(${year}, ${numberdsn})*10000) +
            (SELECT nomor + 1 FROM (
                SELECT COALESCE(
                    SUM(
                        CASE
                            WHEN nid LIKE '${year}${numberdsn}%' THEN 1
                        END
                    )
                , 0) 
            nomor FROM lecturer_identity) 
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
        '${photo}'
    )`;

    db.query(syntax2, (error) => {
        if (error) console.log('' +error);
        else console.log(`Data 'lecturer_identity' berhasil diinput!`);
    });
    res.redirect('/homepage-master-addlecturer');
});

// HTML frontend untuk menampilkan select 'mata kuliah' untuk penambahan mata kuliah - master
app.get('/homepage-master-getmaterialadd', (req, res) => {
    const syntax = `
        SELECT * FROM material
    `;

    db.query(syntax, (error, result) => {
        if (error) console.log('' +error);
        else {
            res.send(result);
            console.log(`Data 'Mata Kuliah' berhasil ditampilkan!`);
        }
    });
});

// HTML frontend untuk menampilkan select 'dosen' untuk penambahan mata kuliah - master
app.get('/homepage-master-getlectureradd', (req, res) => {
    const syntax = `
        SELECT id, name FROM lecturer_identity
    `;

    db.query(syntax, (error, result) => {
        if (error) console.log('' +error);
        else {
            res.send(result);
            console.log(`Data 'Dosen' berhasil ditampilkan!`);
        }
    });
});

// proses kelas - master
app.post('/homepage-master-inputnewclass', (req, res) => {
    const dataraw = req.body.kelaslist;
    const datajson = JSON.parse(dataraw);

    for (const keys in datajson) {
        const namakelas = datajson[keys]['kelas'];
        const mahasiswaid = datajson[keys]['mahasiswaid'];

        const addclass = `
            INSERT INTO class (student_identity_id, class_name) VALUES ('${mahasiswaid}', UPPER('${namakelas}'))
        `;

        db.query(addclass, (error) => {
            if (error) console.log('' +error);
            else console.log(`Daftar 'kelas' berhasil diinput!`);
        });
    }
    res.redirect('/homepage-master-addclass');
});

// HTML frontend untuk menampilkan select 'kelas' untuk penambahan mata kuliah - master
app.get('/homepage-master-getclassadd', (req, res) => {
    const kelas = `
        SELECT DISTINCT class_name FROM class
    `;

    db.query(kelas, (error, result) => {
        if (error) console.log('' +error);
        else {
            res.send(result);
            console.log(`Data 'Kelas' berhasil ditampilkan!`);
        }
    });
});

// proses mata kuliah - master
app.post('/homepage-master-inputnewschedule', (req, res) => {
    const dataraw = req.body.jadwallist;
    const datajson = JSON.parse(dataraw);

    for (const keys in datajson) {
        const kelas = datajson[keys]['kelas'];
        const hari = datajson[keys]['hari'];
        const matakuliah = datajson[keys]['mk'];
        const jam = datajson[keys]['jam'];
        const dosen = datajson[keys]['dosen'];

        const addmk = `
            INSERT INTO schedule (lecturer_identity_id, class_name, material_id, day, clock) VALUES (
                '${dosen}',
                '${kelas}',
                '${matakuliah}',
                '${hari}',
                '${jam}'
            )
        `;

        db.query(addmk, (error) => {
            if (error) console.log('' +error);
            else console.log(`Daftar 'Mata Kuliah' berhasil diinput!`);
        });
    }
    res.redirect('/homepage-master-addmaterialsch');
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