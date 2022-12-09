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
});

// membuat fungsi cek validasi (membuat kelas)
function cekisi() {
  isikolom = true;
  // classi = $("#valkelasinput").val().length < 4 ? false : true;
  var x = $("form.formclassm :input");

  for (var i = 0; i < 3; i++) {
    if ($(x[i]).val() == '' || $(x[i]).val() == null) isikolom = false;
  }
  // console.log('isi kolom = ' +isikolom);
  // console.log('isi kelas = ' +classi);
}

// select jurusan untuk input kelas
$("#valjurusan").ready(function () {
  $("#valjurusan").empty();
  $.ajax ({
    url: '/homepage-master-getmajoradd',
    type: 'GET',
    success: function (reply) {
      $("#valjurusan").append('<option value="" selected>Pilih</option>');
      $.each(reply, function(i, v) {
        $("#valjurusan").append(`
          <option value="` + v.id + `">` + v.major_name + `</option>
        `);
      });
      $("#valjurusan").append('</select>');
      return true;
    },
    error: function (xhr, ajaxOptions, thrownError) {
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
    success: function (reply) {
      // console.log(reply);
      $("#valmahasiswainput").append(`
        <option value="" selected>Pilih</option>
      `);
      $.each(reply, function (i, v) {
        $("#valmahasiswainput").append(`
          <option value="` + v.id + `">` + v.name +`</option>
        `);
      });
      $("#valmahasiswainput").append('</select>');
      return true;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      return false;
    }
  });
});

// menginput hasil kelas ke tabel (kelas untuk mahasiswa)
$("#btnkelas").click(function (e) {
  classi = $("#valkelasinput").val().length < 4 ? false : true;
  var colno = 1;
  var kelas = $("#valkelasinput").val();
  var mahasiswaid = $("#valmahasiswainput").val();
  var mahasiswa = $("#valmahasiswainput :selected").text();
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
      kelaslist[colno.toString()] = {kelas, mahasiswaid};
      // console.log(kelaslist);
    
      // setelah menyimpan, kosongkan isi kecuali kelas
      $(".formclassm .validation1").val('');
      isikolom = false;
    
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
    }
  }
});

// enanble tombol proses (kelas)
$("#checkproseskelas").click(function () {
  var isi = $(this).is(':checked');
  // console.log(isi);

  if (isi == true) $("#proseskelas").removeAttr("disabled");
  
  else $("#proseskelas").attr("disabled", true);
});