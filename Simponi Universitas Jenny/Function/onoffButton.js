function onoffButton() {
    var isi = true;
    $(".onoffbutton").each(function () {
        console.log($(this).val().length);
        if ($(this).val().length < 10) {
            isi = false;
        }
    });

    if (isi) $(".btncari").removeAttr("disabled");

    else $(".btncari").attr("disabled", true);
}