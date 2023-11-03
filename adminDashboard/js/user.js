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

// data handling
var userBaseUrl = "http://localhost:8082/nexttravel/user/service";

$("#user-save-btn").click(() => {
  console.log("Hello user");
  saveUserData();
});

$("#user-update-btn").click(() => {
  updateUser();
});

$("#user-delete-btn").click(() => {
  deleteUser();
});

$("#user-reset-btn").click(() => {
  clearAllData();
});

loadAllUsers();
bindClickEvent();

function saveUserData() {
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
    url: userBaseUrl,
    processData: false,
    cache: false,
    method: "POST",
    mode: "cors",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllUsers();
        clearAllData();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function updateUser() {
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

  formdata.append("userId", uId);
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
    url: userBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "PUT",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllUsers();
        clearAllData();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function deleteUser() {
  let uid = $("#uId").val();
  console.log(uid);

  $.ajax({
    url: userBaseUrl + "?id=" + uid,
    processData: false,
    contentType: false,
    cache: false,
    method: "DELETE",
    // data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllUsers();
        clearAllData();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function loadAllUsers() {
  $("#user-tbl").empty();

  $.ajax({
    url: userBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "GET",
    success: function (res) {
      for (const user of res.data) {
        let row = `<tr>
                 
        <td class="px-4 text-center">${user.userId}</td>
        <td class="px-4 text-center">${user.name}</td>
        <td class="px-4 text-center">${user.age}</td>
        <td class="px-4 text-center">${user.email}</td>
        <td class="px-4 text-center">${user.userName}</td>
        <td class="px-4 text-center">${user.password}</td>
        <td class="px-4 text-center">${user.contactNo}</td>
        <td class="px-5 text-center">${user.address}</td>
        <td class="px-4 text-center">${user.gender}</td>
        <td class="px-4 text-center">${user.nicNo}</td>
        <td><img src="data:guideImg/png;base64,${user.nicImg}" width="150"/></td>
        </tr>`;

        $("#user-tbl").append(row);
      }
      bindClickEvent();
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function bindClickEvent() {
  $("#user-tbl > tr").click(function () {
    // $("#gid-preview").html("");
    let id = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let age = $(this).children().eq(2).text();
    let email = $(this).children().eq(3).text();
    let username = $(this).children().eq(4).text();
    let pws = $(this).children().eq(5).text();
    let phone = $(this).children().eq(6).text();
    let address = $(this).children().eq(7).text();
    let gender = $(this).children().eq(8).text();
    let nic = $(this).children().eq(9).text();
    let nicimg = $(this).children().eq(10).find("img").attr("src");

    console.log("table-click");

    // $("#gimage").val("");
    // $("#gidimage").val("");

    $("#uId").val(id);
    $("#uname").val(name);
    $("#uage").val(age);
    $("#uemail").val(email);
    $("#username").val(username);
    $("#upws").val(pws);
    $("#uphone").val(phone);
    $("#uaddress").val(address);
    $("#ugender").val(gender);
    $("#unic").val(nic);
    $("#uidimageplace").attr("src", nicimg);
  });
}

function clearAllData() {
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
