// image previews

document.getElementById("fimage").addEventListener("change", function (event) {
  var input = event.target;
  var imagePreview = document.getElementById("frontimageplace");

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

document.getElementById("bimage").addEventListener("change", function (event) {
  var input = event.target;
  var imagePreview = document.getElementById("backimageplace");

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

document.getElementById("simage").addEventListener("change", function (event) {
  var input = event.target;
  var imagePreview = document.getElementById("sideimageplace");

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

document.getElementById("dlimage").addEventListener("change", function (event) {
  var input = event.target;
  var imagePreview = document.getElementById("dlimageplace");

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

//datahandling
var vehicleBaseUrl = "http://localhost:8083/nexttravel/vehicle/service";

$("#vsave-btn").click(() => {
  saveVehicle();
});

$("#vupdate-btn").click(() => {
  updateVehicle();
});

$("#vdelete-btn").click(() => {
  deleteVehicle();
});

$("#vreset-btn").click(() => {
  clearAll();
});

loadAllVehicle();
bindClickEventAll();

function saveVehicle() {
  // let uId = $("#uId").val();
  let brand = $("#vbrand").val();
  let category = $("#vcategory").val();
  let ftype = $("#ftype").val();
  let fusage = $("#fusage").val();
  let seats = $("#seat").val();
  let ttype = $("#ttype").val();

  let fimg = $("#fimage")[0].files[0];
  let bimg = $("#bimage")[0].files[0];
  let simg = $("#simage")[0].files[0];

  let dname = $("#dname").val();
  let dnumber = $("#dnumber").val();
  let dlimg = $("#dlimage")[0].files[0];



  const formdata = new FormData();

  formdata.append("vehicleBrand", brand);
  formdata.append("category", category);
  formdata.append("fuelType", ftype);
  formdata.append("value", fusage);
  formdata.append("seats", seats);
  formdata.append("transmissionType", ttype);

  formdata.append("frontImage", fimg);
  formdata.append("backImage", bimg);
  formdata.append("sideImage", simg);

  formdata.append("driverName", dname);
  formdata.append("contactNo", dnumber);
  formdata.append("license", dlimg);

  $.ajax({
    url: vehicleBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "POST",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllVehicle();
        clearAll();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function updateVehicle() {
  let id = $("#vId").val();
  let brand = $("#vbrand").val();
  let category = $("#vcategory").val();
  let ftype = $("#ftype").val();
  let fusage = $("#fusage").val();
  let seats = $("#seat").val();
  let ttype = $("#ttype").val();

  let fimg = $("#fimage")[0].files[0];
  let bimg = $("#bimage")[0].files[0];
  let simg = $("#simage")[0].files[0];

  let dname = $("#dname").val();
  let dnumber = $("#dnumber").val();
  let dlimg = $("#dlimage")[0].files[0];

  const formdata = new FormData();

  formdata.append("vehicleId", id);
  formdata.append("vehicleBrand", brand);
  formdata.append("category", category);
  formdata.append("fuelType", ftype);
  formdata.append("dayValue", fusage);
  formdata.append("seats", seats);
  formdata.append("transmissionType", ttype);

  formdata.append("frontImage", fimg);
  formdata.append("backImage", bimg);
  formdata.append("sideImage", simg);

  formdata.append("driverName", dname);
  formdata.append("contactNo", dnumber);
  formdata.append("license", dlimg);

  $.ajax({
    url: vehicleBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "PUT",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllVehicle();
        clearAll();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function deleteVehicle() {
  let vid = $("#vId").val();

  $.ajax({
    url: vehicleBaseUrl + "?id=" + vid,
    processData: false,
    contentType: false,
    cache: false,
    method: "DELETE",
    // data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllVehicle();
        clearAll();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function loadAllVehicle() {
  $("#allVehicle-tbl").empty();

  $.ajax({
    url: vehicleBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "GET",
    success: function (res) {
      for (const vehicle of res.data) {
        console.log(vehicle.vehicleId);
        let row = `<tr>

                 
        <td class="px-4 text-center">${vehicle.vehicleID}</td>
        <td class="px-4 text-center">${vehicle.vehicleBrand}</td>
        <td class="px-4 text-center">${vehicle.category}</td>
        <td class="px-4 text-center">${vehicle.fuelType}</td>
        <td class="px-4 text-center">${vehicle.dayValue}</td>
        <td class="px-4 text-center">${vehicle.seatCapacity}</td>
        <td class="px-4 text-center">${vehicle.transmissionType}</td>

        <td><img src="data:guideImg/png;base64,${vehicle.vehicleImageFront}" width="150"/></td>
        <td><img src="data:guideImg/png;base64,${vehicle.vehicleImageBack}" width="150"/></td>
        <td><img src="data:guideImg/png;base64,${vehicle.vehicleImageSide}" width="150"/></td>

        <td class="px-4 text-center">${vehicle.driverName}</td>
        <td class="px-4 text-center">${vehicle.contactNo}</td>
        <td><img src="data:guideImg/png;base64,${vehicle.licenseImage}" width="150"/></td>
        </tr>`;

        $("#allVehicle-tbl").append(row);
      }
      bindClickEventAll();
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function bindClickEventAll() {
  $("#allVehicle-tbl > tr").click(function () {
    let id = $(this).children().eq(0).text();
    let brand = $(this).children().eq(1).text();
    let category = $(this).children().eq(2).text();
    let ftype = $(this).children().eq(3).text();
    let fusage = $(this).children().eq(4).text();
    let seats = $(this).children().eq(5).text();
    let transmission = $(this).children().eq(6).text();

    let fimg = $(this).children().eq(7).find("img").attr("src");
    let bimg = $(this).children().eq(8).find("img").attr("src");
    let simg = $(this).children().eq(9).find("img").attr("src");

    let dname = $(this).children().eq(10).text();
    let dcontact = $(this).children().eq(11).text();
    let limg = $(this).children().eq(12).find("img").attr("src");

    $("#vId").val(id);
    $("#vbrand").val(brand);
    $("#vcategory").val(category);
    $("#ftype").val(ftype);
    $("#fusage").val(fusage);
    $("#seat").val(seats);
    $("#ttype").val(transmission);

    $("#frontimageplace").attr("src", fimg);
    $("#backimageplace").attr("src", bimg);
    $("#sideimageplace").attr("src", simg);

    $("#dname").val(dname);
    $("#dnumber").val(dcontact);
    $("#dlimageplace").attr("src", limg);
  });
}

function clearAll() {
  $("#vId").val("");
  $("#vbrand").val("");
  $("#vcategory").val("");
  $("#ftype").val("");
  $("#fusage").val("");
  $("#seat").val("");
  $("#ttype").val("");

  $("#frontimageplace").attr("src", "");
  $("#backimageplace").attr("src", "");
  $("#sideimageplace").attr("src", "");

  $("#dname").val("");
  $("#dnumber").val("");
  $("#dlimageplace").attr("src", "");
}
