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

const StringRegex = /^[A-Za-z\s]+$/;
const addressRegex = /^[0-9a-zA-Z\s.,-]+$/;
const ageRegex = /^(0?[1-9]|[1-9][0-9]|1[01][0-9]|120)$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^(?:\+94|0)[1-9]\d{8}$/;
const nicRegex = /^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/;
const emptyRegex = /.+/;
let fileTypes = ["image/jpeg", "image/png"];

$("#register-btn").click(() => {
  saveUser();
});

/* 
const StringRegex = /^[A-Za-z\s]+$/
const addressRegex = /^[0-9a-zA-Z\s.,-]+$/
const ageRegex = /^(0?[1-9]|[1-9][0-9]|1[01][0-9]|120)$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const phoneRegex = /^(?:\+94|0)[1-9]\d{8}$/
const nicRegex = /^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/
const emptyRegex = /.+/
let fileTypes = ["image/jpeg", "image/png"]


$(".submit").click(function () {
    const name = $(".name").val()
    const address = $(".address").val()
    const password = $(".password").val()
    const email = $(".email").val()
    const phone = $(".phone").val()
    const nic = $(".nic").val()
    const gender = $(".gender").val()
    const profile = $(".profile")[0].files[0]
    const age = $(".age").val()

    if (!name.match(StringRegex)) {
        alert("Enter correct user name!");
    } else if (!address.match(addressRegex)) {
        alert("Enter correct address!");
    } else if (!password.match(passwordRegex)) {
        alert("Enter correct password!");
    } else if (!age.match(ageRegex)) {
        alert("Enter correct age!");
    } else if (!email.match(emailRegex)) {
        alert("Enter correct password!");
    } else if (!phone.match(phoneRegex)) {
        alert("Enter correct phone number!");
    } else if (!nic.match(nicRegex)) {
        alert("Enter correct NIC!");
    } else if ((fileTypes.indexOf(profile.type) === -1)) {
        alert("Upload profile image!");
    } else if (gender === "") {
        alert("Enter gender!");
    } else {
        saveUser()
    }
});




*/

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

  if (!ufname.match(StringRegex) || !ufname.match(emptyRegex)) {
    alert("Enter correct Name");
  } else if (!age.match(ageRegex) || !age.match(emptyRegex)) {
    alert("Enter correct age");
  } else if (!email.match(emailRegex) || !email.match(emptyRegex)) {
    alert("Enter correct Email");
  } else if (!username.match(StringRegex) || !username.match(emptyRegex)) {
    alert("Enter correct username");
  } else if (!pws.match(passwordRegex) || !pws.match(emptyRegex)) {
    alert("Enter correct password");
  } else if (!phone.match(phoneRegex) || !phone.match(emptyRegex)) {
    alert("Enter correct phone number");
  } else if (!address.match(addressRegex) || !address.match(emptyRegex)) {
    alert("Enter correct address");
  } else if (!gender) {
    alert("Enter correct Gender");
  } else if (nic.match(nicRegex) || !nic.match(emptyRegex)) {
    alert("Enter correct Nic number");
  } else if (!nicimg) {
    alert("Add the Nic Image");
  } else {
    const formdata = new FormData();

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
