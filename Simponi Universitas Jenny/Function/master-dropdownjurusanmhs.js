// select jurusan untuk mahasiswa
$("#valjurusanambilmahasiswa").ready(function () {
    $("#valjurusanambilmahasiswa").empty();
			$.ajax({
				url:'/',
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