var kelaslist = {};

// menginput hasil jadwal ke tabel
$("#btnkelas").click(function (e) {
    e.preventDefault();
    var colno = 1;
    var kelas = $("#valkelasinput").val();
    var mahasiswa = $("#valmahasiswainput").val();
    // console.log(kelas, mahasiswa);

    $("#edittableclass").hide();
    $("#tbkelas").attr("hidden", false);
    $(".proseskls").attr("hidden", false);

    // menambah colno
    if ($("#tbkelas tr.rowdata").length > 0) {
        colno = parseInt($("#tbkelas tr.rowdata").last().children('td').first().text()) + 1;
    }

    // inputan masuk ke tabel
    $("#tbkelas").append(`
        <tbody class="table-secondary">
            <tr class="rowdata" id="` + colno + `_rowkelas">
                <td class="tablekelas deleterow" style="text-align: center;" hidden>` + colno + `</td>
                <td class="tablekelas" style="text-align: center;">`+ kelas + `</td>
                <td class="tablekelas">`+ mahasiswa + `</td>
                <td class="tablekelas deleterow" style="text-align: center;"><div><button class="btn btn-dark hapusbaris" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Hapus" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg></button></div></td>
            </tr>
        </tbody>
    `)

    // menyimpan isi dari tabel (objek)
    kelaslist[colno.toString()] = {kelas, mahasiswa};
    // console.log(kelaslist);

    // setelah menyimpan, kosongkan isi kecuali kelas dan hari
    $(".formclassm .validation1").val('');

    // tombol untuk menghapus baris tabel ketika salah input
    $("#" + colno + "_rowkelas .hapusbaris").click(function (e) {
        e.preventDefault();
        var element = $("#" + colno + "_rowkelas .hapusbaris").parent().parent().parent();
        delete kelaslist[$(element.children('td')[0]).text()];
        element.remove();

        // console.log(kelaslist);

        if (Object.keys(kelaslist).length <= 0) {
            $("#edittableclass").show();
        }
        else {
            $("#edittableclass").hide();
        }
    });
});