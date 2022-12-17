// variabel global
var isikolom = false;
var jadwallist = {};

// validasi (pastikan form class .needs-validation, atribut novalidate di div dan atribut require di setiap input)
$(function (){
    var validator = $(".needs-validation").jbvalidator({
        errorMessage: true,
        successClass: true,
        language: "https://emretulek.github.io/jbvalidator/dist/lang/en.json"
    });

    // tooltip
    $("body").tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
});

// membuat fungsi cek validasi (membuat mata kuliah)
function cekisi() { 
    var x = $(".validation0");

    // console.log(x);

    isikolom = true;

    for (var i = 0; i < 5; i++) { 
        if ($(x[i]).val() == "" || $(x[i]).val() == null) {
            isikolom = false;
        }
    }
    console.log(isikolom);
}

// select kelas
$("#valkelasjadwal").ready(function () {
    $("#valkelasjadwal").empty();

    $.ajax({
        url: '/homepage-master-getclassadd',
        type: 'GET',
        success: function(reply) {
            $("#valkelasjadwal").append(`
                <option value="">Pilih</option>
            `);

            $.each(reply, function (i, v) {
                $("#valkelasjadwal").append(`
                    <option value="`+ v.class_name +`">`+ v.class_name +`</option>
                `);
            });
            return true;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            return false;
        }
    });
});

// select mata kuliah
$("#valmkjadwal").ready(function () {
    $("#valmkjadwal").empty();

    $.ajax({
        url: '/homepage-master-getmaterialadd',
        type: 'GET',
        success: function(reply) {
            $("#valmkjadwal").append('<option value="" selected>Pilih</option>');

            $.each(reply, function(i, v) {
                $("#valmkjadwal").append(`
                    <option value="`+ v.id +`">`+ v.material_name +`</option>
                `);
            });
            return true;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            return false;
        }
    });
});

// select dosen
$("#valdosenjadwal").ready(function () {
    $("#valdosenjadwal").empty();
  
    $.ajax ({
      url: '/homepage-master-getlectureradd',
      type: 'GET',
      success: function(reply) {

        $("#valdosenjadwal").append('<option value="" selected>Pilih</option>');
        $.each(reply, function(i, v) {
          $("#valdosenjadwal").append(`
            <option value="` + v.id + `">` + v.name + `</option>
          `);
        });
        return true;
      },
      error: function(xhr, ajaxOptions, thrownError) {
        return false;
      }
    });
  });

// menginput hasil jadwal ke tabel (jadwal mata kuliah)
$("#btnjadwal").click(function (e) {
    var colno = 1;
    var kelas = $("#valkelasjadwal").val();
    var hari = $("#valharijadwal").val();
    var mk = $("#valmkjadwal").val();
    var jam = $("#valjamjadwal").val();
    var dosen = $("#valdosenjadwal").val();
    var mkvalue = $("#valmkjadwal :selected").text();
    var dosenvalue = $("#valdosenjadwal :selected").text();
    // console.log(kelas, hari, mk, jam, dosen);

    if (isikolom) {
        e.preventDefault();
        $("#edittable").hide();
        $(".checkprosesjadwal").attr("hidden", false);
        $("#tbjadwal").attr("hidden", false);
        $(".prosesjdwl").attr("hidden", false);

        // menambah colno
        if ($("#tbjadwal tr.rowdata").length > 0) {
            colno = parseInt($("#tbjadwal tr.rowdata").last().children('td').first().text()) + 1;
        }

        // inputan masuk ke tabel
        $("#tbjadwal .addcolumn").append(`
            <tr class="rowdata" id="` + colno + `_row">
                <td class="tablejadwal deleterow" style="text-align: center;" hidden>` + colno + `</td>
                <td class="tablejadwal" style="text-align: center;">`+ kelas + `</td>
                <td class="tablejadwal" style="text-align: center;">`+ hari + `</td>
                <td class="tablejadwal">`+ mkvalue + `</td>
                <td class="tablejadwal" style="text-align: center;">`+ jam + `</td>
                <td class="tablejadwal">`+ dosenvalue + `</td>
                <td class="tablejadwal deleterow" style="text-align: center;"><div><button class="btn btn-dark hapusbaris" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Hapus" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg></button></div></td>
            </tr>
        `)

        // menyimpan isi dari tabel (objek)
        jadwallist[colno.toString()] = {kelas, hari, mk, jam, dosen};
        // console.log(jadwallist);

        // setelah menyimpan, kosongkan isi kecuali kelas dan hari
        $(".formjadwalmk .validation1").val('');
        isikolom = false;

        // tombol untuk menghapus baris tabel ketika salah input
        $("#" + colno + "_row .hapusbaris").click(function (e) {
            var element = $("#" + colno + "_row .hapusbaris").parent().parent().parent();
            // console.log($(e.target));
            delete jadwallist[$(element.children('td')[0]).text()];
            element.remove();
            // menghilangkan tooltip setelah dihapus
            $(this).tooltip('hide');

            // console.log(jadwallist);

            // kondisi jika tidak ada isi, tampilkan teks kosong dan disable checkbox
            if (Object.keys(jadwallist).length <= 0) {
                $("#edittable").show();
                $("#checkprosesjadwal").attr('disabled', true);
            }
        });
        
        // kondisi jika ada isi, sembunyikan teks kosong dan unable checkbox
        if (Object.keys(jadwallist).length > 0) {
            $("#edittable").hide();
            $("#checkprosesjadwal").removeAttr('disabled');
        }
    }
});

// enanble tombol proses (jadwal mata kuliah)
$("#checkprosesjadwal").click(function () {
  var isi = $(this).is(':checked');
  // console.log(isi);

  if (isi == true) $("#prosesjadwal").removeAttr("disabled");
  
  else $("#prosesjadwal").attr("disabled", true);
});