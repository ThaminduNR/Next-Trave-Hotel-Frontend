$(".button").click(function () {
  let username = $("#login-username").val();
  let pws = $("#login-pws").val();

  if (username == "thamindu" && pws == 1234) {
    localStorage.setItem("admin", username);

    window.location.href = "./adminDashboard.html";
  } else {
    alert("Incorrect username or Password");
  }
});
