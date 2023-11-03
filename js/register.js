document
  .getElementById("unicimage")
  .addEventListener("change", function (event) {
    var input = event.target;
    var imagePreview = document.getElementById("uidimageplace");

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      imagePreview.src = "";
    }
  });

var baseUrl = "http://localhost:8082/nexttravel/user/service";

$("#register-btn").click(() => {
  saveUser();
});

function saveUser() {
  let uId = $("#uId").val();
  let ufname = $("#uname").val();
  let age = $("#uage").val();
  let email = $("#uemail").val();
  let username = $("#username").val();
  let pws = $("#upws").val();
  let phone = $("#uphone").val();
  let address = $("#uaddress").val();
  let gender = $("#ugender").val();
  let nic = $("#unic").val();

  let nicimg = $("#unicimage")[0].files[0];

  const formdata = new FormData();

  // formdata.append("hotelName", uId);
  formdata.append("name", ufname);
  formdata.append("userAge", age);
  formdata.append("email", email);
  formdata.append("userName", username);
  formdata.append("password", pws);
  formdata.append("contactNo", phone);
  formdata.append("address", address);
  formdata.append("gender", gender);
  formdata.append("nicNo", nic);
  formdata.append("nicImg", nicimg);

  $.ajax({
    url: baseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "POST",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        clearAll();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function clearAll() {
  $("#uId").val("");
  $("#uname").val("");
  $("#uage").val("");
  $("#uemail").val("");
  $("#username").val("");
  $("#upws").val("");
  $("#uphone").val("");
  $("#uaddress").val("");
  $("#ugender").val("");
  $("#unic").val("");
  $("#uidimageplace").attr("src", "");
}
