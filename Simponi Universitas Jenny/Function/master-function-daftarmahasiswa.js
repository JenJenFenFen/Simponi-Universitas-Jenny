// variabel global
var phoneinpmhs = true;
var isikolom = true;
var isiformdone = {};

// validasi untuksemua dan nomor handphone (pastikan form class .needs-validation, atribut novalidate di div dan atribut require di setiap input)
$(function (){
  var validator = $(".needs-validation").jbvalidator({
    errorMessage: true,
    successClass: true,
    language: "https://emretulek.github.io/jbvalidator/dist/lang/en.json"
  });

  validator.validator.justnumber = function(el, event){
    if ($(el).is('[id=valnhpmahasiswa]') && $(el).val().length < 11) {
        return 'Your number phone is too short.';
    }
  };
});

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
function cekisi() {

  isikolom = true; // inisialisasi isikolom selalu bernilai true, jika ada yang kosong akan diperiksa di for loop dan di beri nilai false tanpa ada opsi untuk memberikan nilai true kembali di kolom setelahnya
  var isiformraw = $(".formdaftarmahasiswa").serializeArray();

  $.map(isiformraw, function(n, i) {
    isiformdone[n['name']] = n['value'];
  });

  var x = $("form#formmahasiswa :input");


  for (var i = 0; i < 14; i++) { // nilai 14 didapat dari 13 input didalam form + 1 button submit, karena 14 kita sudah tau kalau index ke-14 itu button submit, jadi looping jangan sampai index ke-14
    if ($(x[i]).val() == "" || $(x[i]).val() == null) {
      isikolom = false;
    } 
  }

  if ($('#valnhpmahasiswa').val().length < 11 ) phoneinpmhs = false;
  
  else phoneinpmhs = true;

  // console.log('isikolom = '+isikolom);
  // console.log('phoneinpmhs = '+phoneinpmhs);
}

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