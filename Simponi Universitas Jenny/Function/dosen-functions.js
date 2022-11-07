//membuat fungsi tombol di sidebars
$(".jmatakuliah").click(function (e) {
    e.preventDefault();
    $(".divmatakuliah").attr("hidden", false);
    $(".homepage").attr("hidden", true);
    $(".divmaketask").attr("hidden", true);
    $(".divdaftartugas1").attr("hidden", true);
});

$(".mtugas").click(function (e) {
    e.preventDefault();
    $(".divmaketask").attr("hidden", false);
    $(".divmatakuliah").attr("hidden", true);
    $(".homepage").attr("hidden", true);
    $(".divdaftartugas1").attr("hidden", true);
});

$(".dtugas").click(function (e) {
    e.preventDefault();
    $(".divdaftartugas1").attr("hidden", false);
    $(".divmaketask").attr("hidden", true);
    $(".divmatakuliah").attr("hidden", true);
    $(".homepage").attr("hidden", true);
});

