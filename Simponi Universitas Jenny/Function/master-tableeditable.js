var jadwallist = {};

// menginput hasil jadwal ke tabel
$("#btnjadwal").click(function (e) {
    e.preventDefault();
    var colno = 1;
    var kelas = $("#valkelasjadwal").val();
    var hari = $("#valharijadwal").val();
    var mk = $("#valmkjadwal").val();
    var jam = $("#valjamjadwal").val();
    var dosen = $("#valdosenjadwal").val();
    // console.log(kelas, hari, mk, jam, dosen);

    $("#edittable").hide();
    $("#tbjadwal").attr("hidden", false);
    $(".prosesjdwl").attr("hidden", false);

    // menambah colno
    if ($("#tbjadwal tr.rowdata").length > 0) {
        colno = parseInt($("#tbjadwal tr.rowdata").last().children('td').first().text()) + 1;
    }

    // inputan masuk ke tabel
    $("#tbjadwal").append(`
        <tr class="rowdata" id="` + colno + `_row">
            <td class="tablejadwal deleterow" style="text-align: center;" hidden>` + colno + `</td>
            <td class="tablejadwal" style="text-align: center;">`+ kelas + `</td>
            <td class="tablejadwal" style="text-align: center;">`+ hari + `</td>
            <td class="tablejadwal">`+ mk + `</td>
            <td class="tablejadwal" style="text-align: center;">`+ jam + `</td>
            <td class="tablejadwal">`+ dosen + `</td>
            <td class="tablejadwal deleterow" style="text-align: center;"><div><button class="btn btn-dark hapusbaris" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg></button></div></td>
        </tr>
    `)

    // menyimpan isi dari tabel
    jadwallist[colno.toString()] = {kelas, hari, mk, jam, dosen};
    // console.log(jadwallist);

    // setelah menyimpan, kosongkan semua isi
    $(".formjadwalmk .validation0").val('');

    // tombol untuk menghapus baris tabel ketika salah input
    $("#" + colno + "_row .hapusbaris").click(function (e) {
        e.preventDefault();
        var element = $("#" + colno + "_row .hapusbaris").parent().parent().parent();
        // console.log($(e.target));
        delete jadwallist[$(element.children('td')[0]).text()];
        element.remove();

        console.log(jadwallist);

        if (Object.keys(jadwallist).length <= 0) {
            $("#edittable").show();
        }
        else {
            $("#edittable").hide();
        }
    });
});