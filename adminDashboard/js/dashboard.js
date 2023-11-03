// Side bar active animation
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

//set usermae
var adminname = localStorage.getItem("admin");
$(".dsah_name").text(adminname);

// Navigation

$(".dash-btn").click(() => {
  $("#dashboard").css({ display: "block" });
  $("#vehicle").css({ display: "none" });
  $("#user").css({ display: "none" });
  $("#guide").css({ display: "none" });
  $("#hotel").css({ display: "none" });
  $("#travel").css({ display: "none" });
});

$(".vehi-btn").click(() => {
  $("#dashboard").css({ display: "none" });
  $("#vehicle").css({ display: "block" });
  $("#user").css({ display: "none" });
  $("#guide").css({ display: "none" });
  $("#hotel").css({ display: "none" });
  $("#travel").css({ display: "none" });
});

$(".user-btn").click(() => {
  $("#dashboard").css({ display: "none" });
  $("#vehicle").css({ display: "none" });
  $("#user").css({ display: "block" });
  $("#guide").css({ display: "none" });
  $("#hotel").css({ display: "none" });
  $("#travel").css({ display: "none" });
});
$(".hotel-btn").click(() => {
  $("#dashboard").css({ display: "none" });
  $("#vehicle").css({ display: "none" });
  $("#user").css({ display: "none" });
  $("#guide").css({ display: "none" });
  $("#hotel").css({ display: "block" });
  $("#travel").css({ display: "none" });
});
$(".guide-btn").click(() => {
  $("#dashboard").css({ display: "none" });
  $("#vehicle").css({ display: "none" });
  $("#user").css({ display: "none" });
  $("#guide").css({ display: "block" });
  $("#hotel").css({ display: "none" });
  $("#travel").css({ display: "none" });
});

$(".travel-btn").click(() => {
  $("#dashboard").css({ display: "none" });
  $("#vehicle").css({ display: "none" });
  $("#user").css({ display: "none" });
  $("#guide").css({ display: "none" });
  $("#hotel").css({ display: "none" });
  $("#travel").css({ display: "block" });
});

//logout section

$("#logout").click(() => {
  var confirmLogout = confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    localStorage.clear();
    window.location.href = "./login.html";
  }
});
