// variabel global
var phoneinpmhs = true;
var isikolom = true;
var isiformdone = {};

// membuat validasi untuk nomor handphone (pastikan form class .needs-validation, atribut novalidate di div dan atribut require di setiap input)
$(function (){
  var validator = $(".needs-validation").jbvalidator({
    errorMessage: true,
    successClass: true,
    language: "https://emretulek.github.io/jbvalidator/dist/lang/en.json"
  });

  validator.validator.justnumber = function(el, event){
    if ($(el).is('[id=valnhpdosen]') && $(el).val().length < 11) {
        return 'Your number phone is too short.';
    }

    else if ($(el).is('[id=valnhpmahasiswa]') && $(el).val().length < 11) {
      return 'Your number phone is too short.';
    }
  };
});

// membuat fungsi tombol di sidebars
// $(".bdosen").click(function () {
//   $(".divformdosen").attr("hidden", false);
//   $(".divformmahasiswa").attr("hidden", true);
//   $(".divupdatedosen").attr("hidden", true);
//   $(".divupdatemahasiswa").attr("hidden", true);
//   $(".divmakeschedule").attr("hidden", true);
//   $(".homepage").attr("hidden", true);
//   $(".divmakeclass").attr("hidden", true);
//   $(".validation0").val('');
// });

// $(".bmahasiswa").click(function () {
//   $(".divformmahasiswa").attr("hidden", false);
//   $(".divformdosen").attr("hidden", true);
//   $(".divupdatedosen").attr("hidden", true);
//   $(".divupdatemahasiswa").attr("hidden", true);
//   $(".divmakeschedule").attr("hidden", true);
//   $(".homepage").attr("hidden", true);
//   $(".divmakeclass").attr("hidden", true);
//   $(".validation0").val('');
// });

// $(".udosen").click(function () {
//   $(".divupdatedosen").attr("hidden", false);
//   $(".divupdatemahasiswa").attr("hidden", true);
//   $(".divformdosen").attr("hidden", true);
//   $(".divformmahasiswa").attr("hidden", true);
//   $(".divmakeschedule").attr("hidden", true);
//   $(".validation0").val('');
//   $("#valnim").attr("disabled", true);
//   $(".homepage").attr("hidden", true);
//   $(".divmakeclass").attr("hidden", true);
// });

// $(".umahasiswa").click(function () {
//   $(".divupdatemahasiswa").attr("hidden", false);
//   $(".divupdatedosen").attr("hidden", true);
//   $(".divformdosen").attr("hidden", true);
//   $(".divformmahasiswa").attr("hidden", true);
//   $(".divmakeschedule").attr("hidden", true);
//   $(".validation0").val('');
//   $("#valnid").attr("disabled", true);
//   $(".homepage").attr("hidden", true);
//   $(".divmakeclass").attr("hidden", true);
// });

// $(".mclass").click(function () {  
//   $(".divmakeclass").attr("hidden", false);
//   $(".divmakeschedule").attr("hidden", true);
//   $(".divupdatemahasiswa").attr("hidden", true);
//   $(".divupdatedosen").attr("hidden", true);
//   $(".divformdosen").attr("hidden", true);
//   $(".divformmahasiswa").attr("hidden", true);
//   $(".homepage").attr("hidden", true);
//   $(".validation0").val('');
// });

// $(".lmatakuliah").click(function () {  
//   $(".divmakeschedule").attr("hidden", false);
//   $(".divupdatemahasiswa").attr("hidden", true);
//   $(".divupdatedosen").attr("hidden", true);
//   $(".divformdosen").attr("hidden", true);
//   $(".divformmahasiswa").attr("hidden", true);
//   $(".homepage").attr("hidden", true);
//   $(".divmakeclass").attr("hidden", true);
//   $(".validation0").val('');
// });

// membuat isi dropdown pendidikan terakhir dan jurusan
$(".pilihpendidikan").change(function () {
  var pilihpendidikan = $(".pilihpendidikan").val();
  if (pilihpendidikan == 'SMA/SMK'){
    $(".pilihjurusan").empty();
    $(".pilihjurusan").append(`
        <option value="">Pilih</option>
        <option value="Komputer">IPA/Komputer</option>
    `);
  }
  
  else if (pilihpendidikan == 'S1' || pilihpendidikan == 'S2'){
    $(".pilihjurusan").empty();
    $(".pilihjurusan").append(`
        <option value="">Pilih</option>
        <option value="Teknik Informatika">Teknik Informatika</option>
        <option value="Sistem Informasi">Sistem Informasi</option>
        <option value="Teknik Komputer">Teknik Komputer</option>
    `);
  }
  
  else $(".pilihjurusan").empty();
  
  });

// select jurusan untuk mahasiswa
$("#valjurusanambilmahasiswa").ready(function () {
  $("#valjurusanambilmahasiswa").empty();
    $.ajax({
      url:'/homepage-master-getmajoradd',
      type:'GET',
      success: function (reply) {
        $("#valjurusanambilmahasiswa").append('<option value="" selected>Pilih</option>');
        $.each(reply, function(i, v) {
          $("#valjurusanambilmahasiswa").append(`
            <option value="` + v.id + `">` + v.major_name + `</option>
          `);
        });
        $("#valjurusanambilmahasiswa").append('</select>');
        return true;
      },
      error: function (xhr, ajaxOptions, thrownError) {
        return false;
      }
    });
});

// membuat fungsi cek validasi (daftar mahasiswa baru)
function cekisidm() {

  isikolom = true; /*inisialisasi isikolom selalu bernilai true, jika ada yang kosong akan diperiksa di for loop dan di beri nilai false tanpa ada opsi untuk memberikan nilai true kembali di kolom setelahnya*/
  var isiformraw = $(".formdaftarmahasiswa").serializeArray();

  $.map(isiformraw, function(n, i) {
    isiformdone[n['name']] = n['value'];
  });

  var x = $("form#formmahasiswa :input");


  for (var i = 0; i < 14; i++) { /*nilai 14 didapat dari 13 input didalam form + 1 button submit, karena 14 kita sudah tau kalau index ke-14 itu button submit, jadi looping jangan sampai index ke-14*/
    if ($(x[i]).val() == "" || $(x[i]).val() == null) {
      isikolom = false;
    } 
  }

  if ($('#valnhpmahasiswa').val().length < 11 ) phoneinpmhs = false;
  
  else phoneinpmhs = true;

  // console.log('isikolom = '+isikolom);
  // console.log('phoneinpmhs = '+phoneinpmhs);
}

// munculkan foto di modal (daftar mahasiswa baru)
function readURLPic(u) { /* fungsi membaca URL picture */
  if (/*u.files && */u.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#picurl").attr("src", e.target.result);
    }

    reader.readAsDataURL(u.files[0]);
  }
}

$("#valfotomahasiswa").change(function () {
  readURLPic(this);
});

// button (daftar mahasiswa baru)
$("#btnrevdaftarmahasiswa").click(function (e) {
  phoneinpmhs = ($('#valnhpmahasiswa').val().length < 11 ) ? false : true;
  var isijurusanambil = $("#valjurusanambilmahasiswa :selected").text();

  // console.log(isijurusanambil);

  if (isikolom) {
    if (phoneinpmhs) {
      e.preventDefault();
      $('#i1').text(isiformdone.namamahasiswa);
      $('#i2').text(isiformdone.gender);
      $('#i3').text(isiformdone.tempatl);
      $('#i4').text(isiformdone.tanggall);
      $('#i5').text(isiformdone.status);
      $('#i6').text(isiformdone.pterakhir);
      $('#i7').text(isiformdone.jurusanpterakhir);
      $('#i8').text(isiformdone.email);
      $('#i9').text(isiformdone.alamat);
      $('#i10').text(isiformdone.hp);
      $('#i11').text(isijurusanambil);
      $('#i12').text(isiformdone.programstudi);
      $('#i13').text(isiformdone.semester);

      $('#staticBackdrop').modal('show');
    }
  }
});

// menginput hasil jadwal ke tabel (kelas untuk mahasiswa)
var kelaslist = {};

$("#btnkelas").click(function (e) {
  e.preventDefault();
  var colno = 1;
  var kelas = $("#valkelasinput").val();
  var mahasiswa = $("#valmahasiswainput").val();
  // console.log(kelas, mahasiswa);

  $("#edittableclass").hide();
  $(".checkproseskelas").attr("hidden", false);
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

  // setelah menyimpan, kosongkan isi kecuali kelas
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

// enanble tombol proses (kelas)
$("#checkproseskelas").click(function () {
  var isi = $(this).is(':checked');
  // console.log(isi);

  if (isi == true) $("#proseskelas").removeAttr("disabled");
  
  else $("#proseskelas").attr("disabled", true);
});

// menginput hasil jadwal ke tabel (jadwal mata kuliah)
var jadwallist = {};

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
  $(".checkprosesjadwal").attr("hidden", false);
  $("#tbjadwal").attr("hidden", false);
  $(".prosesjdwl").attr("hidden", false);

  // menambah colno
  if ($("#tbjadwal tr.rowdata").length > 0) {
      colno = parseInt($("#tbjadwal tr.rowdata").last().children('td').first().text()) + 1;
  }

  // inputan masuk ke tabel
  $("#tbjadwal").append(`
      <tbody class="table-secondary">
          <tr class="rowdata" id="` + colno + `_row">
              <td class="tablejadwal deleterow" style="text-align: center;" hidden>` + colno + `</td>
              <td class="tablejadwal" style="text-align: center;">`+ kelas + `</td>
              <td class="tablejadwal" style="text-align: center;">`+ hari + `</td>
              <td class="tablejadwal">`+ mk + `</td>
              <td class="tablejadwal" style="text-align: center;">`+ jam + `</td>
              <td class="tablejadwal">`+ dosen + `</td>
              <td class="tablejadwal deleterow" style="text-align: center;"><div><button class="btn btn-dark hapusbaris" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Hapus" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg></button></div></td>
          </tr>
      </tbody>
  `)

  // menyimpan isi dari tabel (objek)
  jadwallist[colno.toString()] = {kelas, hari, mk, jam, dosen};
  // console.log(jadwallist);

  // setelah menyimpan, kosongkan isi kecuali kelas dan hari
  $(".formjadwalmk .validation1").val('');

  // tombol untuk menghapus baris tabel ketika salah input
  $("#" + colno + "_row .hapusbaris").click(function (e) {
      e.preventDefault();
      var element = $("#" + colno + "_row .hapusbaris").parent().parent().parent();
      // console.log($(e.target));
      delete jadwallist[$(element.children('td')[0]).text()];
      element.remove();

      // console.log(jadwallist);

      if (Object.keys(jadwallist).length <= 0) {
          $("#edittable").show();
      }
      else {
          $("#edittable").hide();
      }
  });
});

// enanble tombol proses (jadwal mata kuliah)
$("#checkprosesjadwal").click(function () {
  var isi = $(this).is(':checked');
  // console.log(isi);

  if (isi == true) $("#prosesjadwal").removeAttr("disabled");
  
  else $("#prosesjadwal").attr("disabled", true);
});