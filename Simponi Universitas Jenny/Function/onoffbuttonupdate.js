//fungsi unanble disable tombol sesuai kondisi
function onOffButtonUpdate(z, e) {
    // console.log($(z).val())
    if ($(z).val().length < 10) {
        $('#' + e).attr("disabled", true);
    }

    else $('#' + e).removeAttr("disabled");
}