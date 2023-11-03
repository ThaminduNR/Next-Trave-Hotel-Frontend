var baseUrl = "http://localhost:8082/nexttravel/user/service";

$("#login-btn").click(() => {
  login();
  console.log("Hello login");
});

function login() {
  let userName = $("#username").val();
  let password = $("#pws").val();

  $.ajax({
    url: baseUrl + "?userName=" + userName + "&password=" + password,
    processData: false,
    contentType: false,
    cache: false,
    method: "GET",
    // data: formdata,
    success: function (res) {
      var user = res.data;
      var userId = user.userId;

      if (user.userName == userName && user.password == password) {
        // alert(res.message);

        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);

        window.location.href = "booking.html";
      } else {
        alert("Wrong user name and password");
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}
