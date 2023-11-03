var gimg = document.getElementById("gimage");
gimg.addEventListener("change", function (event) {
  var input = event.target;
  var imagePreview = document.getElementById("gproimageplace");

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

var gid = document.getElementById("gidimage");
gid.addEventListener("change", function (event) {
  var input = event.target;
  var imagePreview = document.getElementById("gidimageplace");

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

// Data Handling

var guideBaseUrl = "http://localhost:8081/nexttravel/guide/service";

$("#gud-save-btn").click(() => {
  let gid = $("#gId").val();
  if (!gid) {
    saveGuide();
  } else {
    alert("Guide already exist");
  }
});

$("#gud-edit-btn").click(() => {
  console.log("Hrlloo");
  updateGuide();
});
$("#gud-delete-btn").click(() => {
  console.log("Hrlloo");
  deleteGuide();
});
$("#gud-claer-btn").click(() => {
  clearFrom();
  // clearImagePreview();
});

loadAllGuide();
bindClickEventGuides();

// save guide
function saveGuide() {
  let gid = $("#gId").val();
  let gname = $("#gname").val();
  let gaddress = $("#gaddress").val();
  let gage = $("#gage").val();
  let gphone = $("#gphone").val();
  let gex = $("#gexp").val();
  let ggen = $("#ggender").val();
  let gval = $("#gvalue").val();

  let gimage = $("#gimage")[0].files[0];
  let gidimage = $("#gidimage")[0].files[0];

  const formdata = new FormData();

  formdata.append("guideName", gname);
  formdata.append("address", gaddress);
  formdata.append("guideAge", gage);
  formdata.append("gender", ggen);
  formdata.append("contactNo", gphone);
  formdata.append("experience", gex);
  formdata.append("experience", gex);
  formdata.append("value", gval);
  formdata.append("guideImg", gimage);
  formdata.append("guideIdImg", gidimage);

  $.ajax({
    url: guideBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "POST",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllGuide();
        clearFrom();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

//update guide
function updateGuide() {
  let gid = $("#gId").val();
  let gname = $("#gname").val();
  let gaddress = $("#gaddress").val();
  let gage = $("#gage").val();
  let gphone = $("#gphone").val();
  let gex = $("#gexp").val();
  let ggen = $("#ggender").val();
  let gval = $("#gvalue").val();

  let gimage = $("#gimage")[0].files[0];
  let gidimage = $("#gidimage")[0].files[0];

  const formdata = new FormData();

  formdata.append("guideId", gid);
  formdata.append("guideName", gname);
  formdata.append("address", gaddress);
  formdata.append("guideAge", gage);
  formdata.append("gender", ggen);
  formdata.append("contactNo", gphone);
  formdata.append("experience", gex);
  formdata.append("experience", gex);
  formdata.append("value", gval);
  formdata.append("guideImg", gimage);
  formdata.append("guideIdImg", gidimage);

  $.ajax({
    url: guideBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "PUT",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllGuide();
        clearFrom();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}
// delete guide
function deleteGuide() {
  let gid = $("#gId").val();
  console.log(gid);

  $.ajax({
    url: guideBaseUrl + "?id=" + gid,
    processData: false,
    contentType: false,
    cache: false,
    method: "DELETE",
    // data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllGuide();
        clearFrom();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function loadAllGuide() {
  $("#all-guide-tbl").empty();

  $.ajax({
    url: guideBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "GET",
    success: function (res) {
      for (const guide of res.data) {
        let row = `<tr>
                 
        <td>${guide.guideId}</td>
        <td>${guide.guideName}</td>
        <td>${guide.address}</td>
        <td>${guide.age}</td>
        <td>${guide.contactNo}</td>
        <td>${guide.experience}</td>
        <td>${guide.gender}</td>
        <td>${guide.dayValue}</td>
        <td><img src="data:guideImg/png;base64,${guide.guideImg}" width="150"/></td>
        <td><img src="data:guideIdImg/png;base64,${guide.guideIdImg}" width="150"/></td>
        
        </tr>`;

        $("#all-guide-tbl").append(row);
      }
      bindClickEventGuides();
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function bindClickEventGuides() {
  $("#all-guide-tbl > tr").click(function () {
    console.log("guide table clicked");
    // $("#gid-preview").html("");
    let id = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let address = $(this).children().eq(2).text();
    let age = $(this).children().eq(3).text();
    let phone = $(this).children().eq(4).text();
    let exp = $(this).children().eq(5).text();
    let gender = $(this).children().eq(6).text();
    let value = $(this).children().eq(7).text();

    let proimage = $(this).children().eq(8).find("img").attr("src");
    let idimage = $(this).children().eq(9).find("img").attr("src");

    console.log("table click");

    $("#gimage").val("");
    $("#gidimage").val("");

    $("#gId").val(id);
    $("#gname").val(name);
    $("#gaddress").val(address);
    $("#gage").val(age);
    $("#gphone").val(phone);
    $("#gexp").val(exp);
    $("#ggender").val(gender);
    $("#gvalue").val(value);
    $("#gproimageplace").attr("src", proimage);
    $("#gidimageplace").attr("src", idimage);
  });
}

function clearFrom() {
  $("#gId").val("");
  $("#gname").val("");
  $("#gaddress").val("");
  $("#gage").val("");
  $("#gphone").val("");
  $("#gexp").val("");
  $("#ggender").val("");
  $("#gvalue").val("");

  $("#gimage").val("");
  $("#gidimage").val("");

  $("#gproimageplace").attr("src", "");
  $("#gidimageplace").attr("src", "");
  $("#gimage-preview").attr("src", "");
}
