// variabel global

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

    else if ($(el).is('[id=valnidosen]') && $(el).val().length < 10) {
      return 'Your nid is too short.';
    }

    else if ($(el).is('[id=valnimahasiswa]') && $(el).val().length < 10) {
      return 'Your nim is too short.';
    }
  };
});