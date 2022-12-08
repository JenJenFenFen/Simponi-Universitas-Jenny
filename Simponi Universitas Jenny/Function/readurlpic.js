function readURLPic(u) { /* fungsi membaca URL picture */
    if (u.files && u.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#picurl").attr("src", e.target.result);
        }
        
        reader.readAsDataURL(u.files[0]);
    }
}