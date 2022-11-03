//membuat fungsi tombol di sidebars
$(".jmatakuliah").click(function (e) {
    e.preventDefault();
    $(".divmatakuliah").attr("hidden", false);
    $(".homepage").attr("hidden", true);
    $(".divtugasbs").attr("hidden", true);
    $(".divtugasss").attr("hidden", true);
    $(".validation0").val('');
});

$(".tugasbs").click(function (e) {
    e.preventDefault();
    $(".divtugasbs").attr("hidden", false);
    $(".divmatakuliah").attr("hidden", true);
    $(".homepage").attr("hidden", true);
    $(".divtugasss").attr("hidden", true);
    $(".validation0").val('');
});

$(".tugasss").click(function (e) {
    e.preventDefault();
    $(".divtugasss").attr("hidden", false);
    $(".divtugasbs").attr("hidden", true);
    $(".divmatakuliah").attr("hidden", true);
    $(".homepage").attr("hidden", true);
    $(".validation0").val('');
});

