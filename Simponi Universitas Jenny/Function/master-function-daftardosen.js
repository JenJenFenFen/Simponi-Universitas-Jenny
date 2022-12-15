// variabel global
var phoneinpdsn = false;
var isikolom = false;
var isiformdone = {};

// validasi (pastikan form class .needs-validation, atribut novalidate di div dan atribut require di setiap input)
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
  };
});

// membuat fungsi cek validasi (daftar mahasiswa baru)
function cekisi() {
  var x = $(".validation0");
  var isiformraw = $(".formdaftardosen").serializeArray();

  // console.log(x);

  $.map(isiformraw, function(n, i) {
    isiformdone[n['name']] = n['value'];
  });

  isikolom = true;
  phoneinpdsn = $("#valnhpdosen").val().length < 11 ? false : true;

  for (var i = 0; i < 11; i++) {
    if ($(x[i]).val() == "" || $(x[i]).val() == null) {
      isikolom = false;
    } 
  }
  // console.log('isikolom = '+isikolom);
  // console.log('phoneinpdsn = '+phoneinpdsn);
}

// button (daftar dosen baru)
$("#btnrevdaftardosen").click(function (e) {
  if (isikolom) {
    if (phoneinpdsn) {
      e.preventDefault();
      $('#i1').text(isiformdone.namadosen);
      $('#i2').text(isiformdone.gender);
      $('#i3').text(isiformdone.tempatl);
      $('#i4').text(isiformdone.tanggall);
      $('#i5').text(isiformdone.status);
      $('#i6').text(isiformdone.pterakhir);
      $('#i7').text(isiformdone.jurusan);
      $('#i8').text(isiformdone.email);
      $('#i9').text(isiformdone.alamat);
      $('#i10').text(isiformdone.hp);

      $('#staticBackdrop').modal('show');
    }
  }
});