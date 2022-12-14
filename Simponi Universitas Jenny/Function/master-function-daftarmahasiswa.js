// variabel global
var phoneinpmhs = false;
var isikolom = false;
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

// select program studi
$("#valprogramstudimahasiswa").ready(function () {
  $("#valprogramstudimahasiswa").empty();

  $.ajax({
    url:'/homepage-master-getstudyprogramadd',
    type:'GET',
    success: function (reply) {
      $("#valprogramstudimahasiswa").append('<option value="" selected>Pilih</option>');
      $.each(reply, function(i, v) {
        $("#valprogramstudimahasiswa").append(`
          <option value="` + v.id + `">` + v.study_program_name + `</option>
        `);
      });
      return true;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      return false;
    }
  });
});

// select jurusan untuk mahasiswa
$("#valprogramstudimahasiswa").change(function () {
  $("#valjurusanambilmahasiswa").empty();
  var programstudiid = $("#valprogramstudimahasiswa").val();
  // console.log(programstudiid);

  $.ajax({
    url:'/homepage-master-getmajoradd',
    type:'GET',
    data: {programstudi: programstudiid},
    success: function (reply) {
      // console.log(reply);
      $("#valjurusanambilmahasiswa").append('<option value="" selected>Pilih</option>');
      $.each(reply, function(i, v) {
        $("#valjurusanambilmahasiswa").append(`
          <option value="` + v.id + `">` + v.major_name + `</option>
        `);
      });
      return true;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      return false;
    }
  });
});

// membuat fungsi cek validasi (daftar mahasiswa baru)
function cekisi() {
  var x = $(".validation0");
  var isiformraw = $(".formdaftarmahasiswa").serializeArray();

  // console.log(x);

  $.map(isiformraw, function(n, i) {
    isiformdone[n['name']] = n['value'];
  });

  phoneinpmhs = $('#valnhpmahasiswa').val().length < 11 ? false : true;

  for (var i = 0; i < 14; i++) {
    if ($(x[i]).val() == "" || $(x[i]).val() == null) {
      isikolom = false;
    }
    else isikolom = true;
  }

  // console.log('isikolom = '+isikolom);
  // console.log('phoneinpmhs = '+phoneinpmhs);
}

// button (daftar mahasiswa baru)
$("#btnrevdaftarmahasiswa").click(function (e) {
  var isistudi = $("#valprogramstudimahasiswa :selected").text();
  var isijurusanambil = $("#valjurusanambilmahasiswa :selected").text();

  // console.log('isikolom = '+isikolom);
  // console.log('phoneinpmhs = '+phoneinpmhs);

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
      $('#i11').text(isistudi);
      $('#i12').text(isijurusanambil);
      $('#i13').text(isiformdone.semester);

      $('#staticBackdrop').modal('show');
    }
  }
});