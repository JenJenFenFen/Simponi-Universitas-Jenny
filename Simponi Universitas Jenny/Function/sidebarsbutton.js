//membuat fungsi tombol di sidebars
$(".bdosen").click(function (e) {
    e.preventDefault();
    $(".divformdosen").attr("hidden", false);
    $(".divformmahasiswa").attr("hidden", true);
    $(".divupdatedosen").attr("hidden", true);
    $(".divupdatemahasiswa").attr("hidden", true);
    $(".divmakeschedule").attr("hidden", true);
    $(".validation0").val('');
  });

  $(".bmahasiswa").click(function (e) {
    e.preventDefault();
    $(".divformmahasiswa").attr("hidden", false);
    $(".divformdosen").attr("hidden", true);
    $(".divupdatedosen").attr("hidden", true);
    $(".divupdatemahasiswa").attr("hidden", true);
    $(".divmakeschedule").attr("hidden", true);
    $(".validation0").val('');
  });

  $(".udosen").click(function (e) {
    e.preventDefault();
    $(".divupdatedosen").attr("hidden", false);
    $(".divupdatemahasiswa").attr("hidden", true);
    $(".divformdosen").attr("hidden", true);
    $(".divformmahasiswa").attr("hidden", true);
    $(".divmakeschedule").attr("hidden", true);
    $(".validation0").val('');
    $("#valnim").attr("disabled", true);
  });

  $(".umahasiswa").click(function (e) {
    e.preventDefault();
    $(".divupdatemahasiswa").attr("hidden", false);
    $(".divupdatedosen").attr("hidden", true);
    $(".divformdosen").attr("hidden", true);
    $(".divformmahasiswa").attr("hidden", true);
    $(".divmakeschedule").attr("hidden", true);
    $(".validation0").val('');
    $("#valnid").attr("disabled", true);
  });

  $(".lmatakuliah").click(function (e) {  
    e.preventDefault();
    $(".divmakeschedule").attr("hidden", false);
    $(".divupdatemahasiswa").attr("hidden", true);
    $(".divupdatedosen").attr("hidden", true);
    $(".divformdosen").attr("hidden", true);
    $(".divformmahasiswa").attr("hidden", true);
    $(".validation0").val('');
  });