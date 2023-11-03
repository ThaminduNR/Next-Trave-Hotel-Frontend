//data handling

var baseTravelUrl = "http://localhost:8085/nexttravel/travel/service";

$("#package-save-btn").click(() => {
  let pid = $("#packageId").val();

  if (!pid) {
    saveHotelPackage();
  } else {
    alert("Package Already Added");
  }
});

$("#package-update-btn").click(() => {
  updateHotelPackage();
});
$("#package-delete-btn").click(() => {
  var isDelete = confirm("Are you sure want to Delete?");
  if (isDelete) {
    deleteTravelPackage();
  }
});

$("#package-reset-btn").click(() => {
  clearPackageForm();
});

loadAllPacakageData();

function saveHotelPackage() {
  var hotel = {
    category: $("#pcategory").val(),
    startDate: $("#sdate").val(),
    endDate: $("#edate").val(),
    travelArea: $("#tarea").val(),
    totalHeadCount: $("#thcount").val(),
    packageValue: $("#packagevalue").val(),
    paidValue: $("#paidvalue").val(),
    vehicleId: $("#vid").val(),
    hotelId: $("#hid").val(),
    guideId: $("#gid").val(),
    customerId: $("#cid").val(),
  };

  $.ajax({
    url: baseTravelUrl,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(hotel),
    success: function (res) {
      if (res.code == 200) {
        alert("Successfully");
        loadAllPacakageData();
        clearPackageForm();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function updateHotelPackage() {
  var hotel = {
    packageId: $("#packageId").val(),
    category: $("#pcategory").val(),
    startDate: $("#sdate").val(),
    endDate: $("#edate").val(),
    travelArea: $("#tarea").val(),
    totalHeadCount: $("#thcount").val(),
    packageValue: $("#packagevalue").val(),
    paidValue: $("#paidvalue").val(),
    vehicleId: $("#vid").val(),
    hotelId: $("#hid").val(),
    guideId: $("#gid").val(),
    customerId: $("#cid").val(),
  };

  $.ajax({
    url: baseTravelUrl,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(hotel),
    success: function (res) {
      if (res.code == 200) {
        alert("Successfully Updated");
        loadAllPacakageData();
        clearPackageForm();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function deleteTravelPackage() {
  let pid = $("#packageId").val();
  console.log(gid);

  $.ajax({
    url: baseTravelUrl + "?id=" + pid,
    processData: false,
    contentType: false,
    cache: false,
    method: "DELETE",
    // data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllPacakageData();
        clearPackageForm();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function loadAllPacakageData() {
  $("#package-data").empty();

  $.ajax({
    url: baseTravelUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "GET",
    success: function (res) {
      for (const package of res.data) {
        let row = `<tr>
                 
        <td>${package.packageId}</td>
        <td>${package.category}</td>
        <td>${package.startDate}</td>
        <td>${package.endDate}</td>
        <td>${package.travelArea}</td>
        <td>${package.totalHeadCount}</td>
        <td>${package.packageValue}</td>
        <td>${package.paidValue}</td>
        <td>${package.vehicleId}</td>
        <td>${package.hotelId}</td>
        <td>${package.guideId}</td>
        <td>${package.customerId}</td>
        
        </tr>`;

        $("#package-data").append(row);
      }
      bondClickPackageEvenet();
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function bondClickPackageEvenet() {
  $("#package-data > tr").click(function () {
    console.log("guide table clicked");
    // $("#gid-preview").html("");
    let id = $(this).children().eq(0).text();
    let category = $(this).children().eq(1).text();
    let sdate = $(this).children().eq(2).text();
    let edate = $(this).children().eq(3).text();
    let tarea = $(this).children().eq(4).text();
    let totalHeadCount = $(this).children().eq(5).text();
    let packageValue = $(this).children().eq(6).text();
    let paidVAlue = $(this).children().eq(7).text();
    let vehid = $(this).children().eq(8).text();
    let htlId = $(this).children().eq(9).text();
    let guideId = $(this).children().eq(10).text();
    let custId = $(this).children().eq(11).text();

    $("#gimage").val("");
    $("#gidimage").val("");

    $("#packageId").val(id);
    $("#pcategory").val(category);
    $("#sdate").val(sdate);
    $("#edate").val(edate);
    $("#tarea").val(tarea);
    $("#thcount").val(totalHeadCount);
    $("#packagevalue").val(packageValue);
    $("#paidvalue").val(paidVAlue);
    $("#vid").val(vehid);
    $("#hid").val(htlId);
    $("#gid").val(guideId);
    $("#cid").val(custId);
  });
}

function clearPackageForm() {
  $("#packageId").val("");
  $("#pcategory").val("");
  $("#sdate").val("");
  $("#edate").val("");
  $("#tarea").val("");
  $("#thcount").val("");
  $("#packagevalue").val("");
  $("#paidvalue").val("");
  $("#vid").val("");
  $("#hid").val("");
  $("#gid").val("");
  $("#cid").val("");
}
