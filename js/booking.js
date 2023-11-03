// Days Counts function

dayCount();

function dayCount() {
  const startDateInput = document.getElementById("sdate");
  const endDateInput = document.getElementById("edate");

  startDateInput.addEventListener("change", updateDateDifference);
  endDateInput.addEventListener("change", updateDateDifference);

  function updateDateDifference() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (!isNaN(startDate) && !isNaN(endDate)) {
      const differenceInMilliseconds = endDate - startDate;
      const daysDifference = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      console.log(daysDifference);
      document.getElementById("tdate").value = daysDifference;
    }
  }
}

//data handling

// set username

var userId = localStorage.getItem("userId");
var userName = localStorage.getItem("userName");

console.log(userId);
console.log(userName);

if (!localStorage.length === 0) {
  $("#navbarDropdownMenuLink").text(userName);
}

$("#logout").click(function () {
  var logoutbooking = confirm("Are you sure you want to log out?");
  if (logoutbooking) {
    localStorage.clear();
    window.location.href = "index.html";
  }
});

//  get selected package category value
var selectValue;

var vehicleUrl = "http://localhost:8083/nexttravel/vehicle/service";

var hotelUrl = "http://localhost:8080/nexttravel/hotel/service";

var guideUrl = "http://localhost:8081/nexttravel/guide/service";

$("#pcategory").ready(function () {
  $("select.form-control").change(function () {
    selectValue = $(this).children("option:selected").val();
    console.log(selectValue);
  });
});

$("#package-btn").click(function () {
  loadVehicleDetails();
  loadHotelDetails();
});

$("#needguide").click(function () {
  getAllGuide();
});

function loadVehicleDetails() {
  $.ajax({
    url: vehicleUrl + "?category=" + selectValue,
    processData: false,
    contentType: false,
    cache: false,
    method: "GET",
    success: function (res) {
      for (const vehicle of res.data) {
        let row = `<tr>

        <td class="px-4 text-center">${vehicle.vehicleID}</td>
        <td class="px-4 text-center">${vehicle.vehicleBrand}</td>
        <td class="px-4 text-center">${vehicle.category}</td>
        <td class="px-4 text-center">${vehicle.fuelType}</td>
        <td class="px-4 text-center">${vehicle.seatCapacity}</td>
        <td class="px-4 text-center">${vehicle.dayValue}</td>
        <td><img src="data:guideImg/png;base64,${vehicle.vehicleImageFront}" width="150"/></td>
        <td><img src="data:guideImg/png;base64,${vehicle.vehicleImageBack}" width="150"/></td>
      
        </tr>`;
        $("#travel-pacakageVehicle-tbl").append(row);
      }
      bindVehicleClickEvenet();
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function loadHotelDetails() {
  $("#travel-pacakage-tbl").empty();

  $.ajax({
    url: hotelUrl + "?category=" + selectValue,
    processData: false,
    contentType: false,
    cache: false,
    method: "GET",
    success: function (res) {
      for (const hotel of res.data) {
        let row = `<tr>
        
        <td class="px-4 text-center">${hotel.hotelId}</td>
        <td class="px-4 text-center">${hotel.hotelName}</td>
        <td class="px-4 text-center">${hotel.location}</td>
        <td class="px-4 text-center">${hotel.contactNo}</td>
        <td class="px-4 text-center">${hotel.hotelFee}</td>
        <td class="px-4 text-center">${hotel.cancellation}</td>
        <td><img src="data:guideImg/png;base64,${hotel.hotelImage}" width="150"/></td>
        </tr>`;

        $("#travel-pacakage-tbl").append(row);
      }
      bindHotelClickEvent();
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function bindVehicleClickEvenet() {
  $("#travel-pacakageVehicle-tbl > tr").click(function () {
    let vid = $(this).children().eq(0).text();
    let vname = $(this).children().eq(1).text();
    let dayvalue = $(this).children().eq(5).text();
    let fimg = $(this).children().eq(6).find("img").attr("src");
    let bimg = $(this).children().eq(7).find("img").attr("src");

    console.log("click");

    $("#vid").val(vid);
    $("#dayValue").val(dayvalue);

    $("#frontimageplace").attr("src", fimg);
    $("#backimageplace").attr("src", bimg);
  });
}

function bindHotelClickEvent() {
  $("#travel-pacakage-tbl > tr ").click(function () {
    let hid = $(this).children().eq(0).text();
    let hname = $(this).children().eq(1).text();
    let hfee = $(this).children().eq(4).text();

    let himg = $(this).children().eq(6).find("img").attr("src");

    $("#hId").val(hid);
    $("#hfee").val(hfee);

    $("#htlimageplace").attr("src", himg);
  });
}

function getAllGuide() {
  $("#travel-pacakage-guide-tbl").empty();

  $.ajax({
    url: guideUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "GET",
    success: function (res) {
      for (const guide of res.data) {
        let row = `<tr>
                 
        <td>${guide.guideId}</td>
        <td>${guide.guideName}</td>
        <td>${guide.age}</td>
        <td>${guide.contactNo}</td>
        <td>${guide.experience}</td>
        <td>${guide.dayValue}</td>
        <td><img src="data:guideImg/png;base64,${guide.guideImg}" width="150"/></td>
        </tr>`;

        $("#travel-pacakage-guide-tbl").append(row);
      }
      bindClickEventGuides();
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function bindClickEventGuides() {
  $("#travel-pacakage-guide-tbl > tr").click(function () {
    let gid = $(this).children().eq(0).text();
    let dofvalue = $(this).children().eq(5).text();

    let gimg = $(this).children().eq(6).find("img").attr("src");

    $("#gid").val(gid);
    $("#gdayv").val(dofvalue);

    $("#gimageplace").attr("src", gimg);
  });
}

//////////////////////////////////////////////////////////////////////////

// caculate the taotal package value

$(document).ready(function () {
  const $input1 = $("#adult");
  const $input2 = $("#child");
  const $totalCost = $("#totalCost");

  $input1.on("input", updateSum);
  $input2.on("input", updateSum);

  function updateSum() {
    let guideDayValue = $("#gdayv").val();

    if (!guideDayValue == "") {
      guideDayValue = parseFloat($("#gdayv").val());
    } else {
      guideDayValue = 0;
    }

    let dayCount = parseFloat($("#tdate").val());

    let vehicleDayValue = parseFloat($("#dayValue").val());
    let hotelDayFee = parseFloat($("#hfee").val());

    let cost =
      vehicleDayValue * dayCount +
      hotelDayFee * dayCount +
      guideDayValue * dayCount;

    const value1 = parseFloat($input1.val()) || 0;
    const value2 = parseFloat($input2.val()) || 0;

    const sum = cost;
    $totalCost.text(sum);
    console.log(sum);
    // console.log("total date " + dayCount);
  }
});

// add booking
