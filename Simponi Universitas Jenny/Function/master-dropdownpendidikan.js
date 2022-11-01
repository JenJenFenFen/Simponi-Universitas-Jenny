//membuat isi dropdown pendidikan terakhir dan jurusan
$(".pilihpendidikan").change(function (e) {
var pilihpendidikan = $(".pilihpendidikan").val();
if (pilihpendidikan == 'SMA/SMK'){
    e.preventDefault();
    $(".pilihjurusan").empty();
    $(".pilihjurusan").append(`
        <option value="">Pilih</option>
        <option value="Komputer">Komputer</option>
    `);
}

else if (pilihpendidikan == 'S1' || pilihpendidikan == 'S2'){
    e.preventDefault();
    $(".pilihjurusan").empty();
    $(".pilihjurusan").append(`
        <option value="">Pilih</option>
        <option value="Teknik Informatika">Teknik Informatika</option>
        <option value="Sistem Informasi">Sistem Informasi</option>
        <option value="Teknik Komputer">Teknik Komputer</option>
    `);
}

else  {
    e.preventDefault();
    $(".pilihjurusan").empty();
}
});