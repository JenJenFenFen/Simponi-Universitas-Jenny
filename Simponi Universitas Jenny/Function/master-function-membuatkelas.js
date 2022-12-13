// variabel global
var isikolom = true;
var classi = true;
var kelaslist = {};

// validasi (pastikan form class .needs-validation, atribut novalidate di div dan atribut require di setiap input)
$(function (){
  var validator = $(".needs-validation").jbvalidator({
    errorMessage: true,
    successClass: true,
    language: "https://emretulek.github.io/jbvalidator/dist/lang/en.json"
  });

  validator.validator.class = function(el, event){
    if ($(el).is('[id=valkelasinput]') && $(el).val().length < 4) {
      return 'Class is too short.';
    }
  };

  // tooltip
  $("body").tooltip({
    selector: '[data-bs-toggle="tooltip"]'
  });
});

// membuat fungsi cek validasi (membuat kelas)
function cekisi() {
  isikolom = true;
  classi = $("#valkelasinput").val().length < 4 ? false : true;
  var x = $(".validation0");
  
  // console.log(x);

  for (var i = 0; i < 3; i++) {
    if ($(x[i]).val() == '' || $(x[i]).val() == null) isikolom = false;
  }
  // console.log('isi kolom = ' +isikolom);
  // console.log('isi kelas = ' +classi);
}

// select program studi untuk input kelas
$("#valprogramstudi").ready(function () {
  $("#valprogramstudi").empty();

  $.ajax ({
    url: '/homepage-master-getstudyprogramadd',
    type: 'GET',
    success: function(reply) {
      $("#valprogramstudi").append('<option value="" selected>Pilih</option>');
      $.each(reply, function(i, v) {
        $("#valprogramstudi").append(`
          <option value="` + v.id + `">` + v.study_program_name + `</option>
        `);
      });
      return true;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      return false;
    }
  });
});

// select jurusan untuk input kelas
$("#valprogramstudi").change(function () {
  var studiid = $("#valprogramstudi").val();
  $("#valjurusan").empty();

  $.ajax ({
    url: '/homepage-master-getmajoradd',
    type: 'GET',
    data: {programstudi: studiid},
    success: function(reply) {
      $("#valjurusan").append('<option value="" selected>Pilih</option>');
      $.each(reply, function(i, v) {
        $("#valjurusan").append(`
          <option value="` + v.id + `">` + v.major_name + `</option>
        `);
      });
      return true;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      return false;
    }
  });
});

// select nama mahasiswa berdasarkan jurusan yang diambil
$("#valjurusan").change(function () {
  var jurusanid = $("#valjurusan").val();
  $("#valmahasiswainput").empty();

  $.ajax ({
    url: '/homepage-master-getmhsadd',
    type: 'GET',
    data: {jurusan: jurusanid},
    success: function(reply) {
      // console.log(reply);
      $("#valmahasiswainput").append(`
        <option value="" selected>Pilih</option>
      `);
      $.each(reply, function (i, v) {
        $("#valmahasiswainput").append(`
          <option value="` + v.id + `">` + v.name +`</option>
        `);
      });
      return true;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      return false;
    }
  });
});

// menginput hasil kelas ke tabel (kelas untuk mahasiswa)
$("#btnkelas").click(function (e) {
  var colno = 1;
  var kelas = $("#valkelasinput").val();
  var jurusanid = $("#valjurusan").val();
  var jurusantext = $("#valjurusan :selected").text();
  var mahasiswaid = $("#valmahasiswainput").val();
  var mahasiswatext = $("#valmahasiswainput :selected").text();
  // console.log(kelas, mahasiswa);

  // console.log('isi kolom = ' +isikolom);
  // console.log('isi kelas = ' +classi);

  // menambah colno
  if (isikolom) {
    if (classi) {
      e.preventDefault();
      $("#edittableclass").hide();
      $(".checkproseskelas").attr("hidden", false);
      $("#tbkelas").attr("hidden", false);
      $(".proseskls").attr("hidden", false);

      if ($("#tbkelas tr.rowdata").length > 0) {
        colno = parseInt($("#tbkelas tr.rowdata").last().children('td').first().text()) + 1;
      }
    
      // inputan masuk ke tabel
      $("#tbkelas .addcolumn").append(`
        <tr class="rowdata" id="` + colno + `_rowkelas">
          <td class="tablekelas deleterow" style="text-align: center;" hidden>` + colno + `</td>
          <td class="tablekelas" style="text-align: center;">`+ kelas + `</td>
          <td class="tablekelas">`+ jurusantext + `</td>
          <td class="tablekelas">`+ mahasiswatext + `</td>
          <td class="tablekelas deleterow" style="text-align: center;"><div><button class="btn btn-dark hapusbaris" type="button" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Hapus"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg></button></div></td>
        </tr>
      `)
    
      // menyimpan isi dari tabel (objek)
      kelaslist[colno.toString()] = {kelas, jurusanid, mahasiswaid};
      // console.log(kelaslist);
    
      // setelah menyimpan, kosongkan isi kecuali kelas
      $(".formclassm .validation1").val('');
      isikolom = false;
    
      // tombol untuk menghapus baris tabel ketika salah input
      $("#" + colno + "_rowkelas .hapusbaris").click(function (e) {
        var element = $("#" + colno + "_rowkelas .hapusbaris").parent().parent().parent();
        delete kelaslist[$(element.children('td')[0]).text()];
        element.remove();
        // menghilangkan tooltip setelah dihapus
        $(this).tooltip('hide');
    
        // console.log(kelaslist);
    
        // kondisi jika tidak ada isi, tampilkan text kosong dan disabled checkbox
        if (Object.keys(kelaslist).length <= 0) {
          $("#edittableclass").show();
          $("#checkproseskelas").attr('disabled', true);
        }
        // console.log('isi = ' +Object.keys(kelaslist).length);
      });

      // kondisi jika ada isi, sembunyikan teks kosong dan unable checkbox
      if (Object.keys(kelaslist).length > 0) {
        $("#edittableclass").hide();
        $("#checkproseskelas").removeAttr('disabled');
      }
    }
  }
  // console.log('isi = ' +Object.keys(kelaslist).length);
});

// enanble tombol proses (kelas)
$("#checkproseskelas").click(function () {
  var isi = $(this).is(':checked');
  // console.log(isi);

  if (isi == true) $("#proseskelas").removeAttr("disabled");
  
  else $("#proseskelas").attr("disabled", true);
});