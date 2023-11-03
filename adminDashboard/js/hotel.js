function setImagePreview(fileInputId, imagePreviewId) {
  var fileInput = document.getElementById(fileInputId);
  var imagePreview = document.getElementById(imagePreviewId);

  fileInput.addEventListener("change", function (event) {
    var input = event.target;

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
}

document.getElementById("himage").addEventListener("change", function (event) {
  var input = event.target;
  var imagePreview = document.getElementById("hotelimageplace");

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

var hotelBaseUrl = "http://localhost:8080/nexttravel/hotel/service";

$("#hotel-save-btn").click(() => {
  saveHotel();
});

$("#hotel-update-btn").click(() => {
  updateHotel();
});
$("#hotel-delete-btn").click(() => {
  deleteHotel();
});
$("#hotel-reset-btn").click(() => {
  console.log("hellooo hotel cleeR");
  clearAllHotels();
});

loadAllHotels();
bindClickEventHotels();

function saveHotel() {
  let hId = $("#hId").val();
  let hname = $("#hname").val();
  let hlocation = $("#hlocation").val();
  let hlocationmap = $("#hlocationmap").val();
  let hmail = $("#hmail").val();
  let hcontact = $("#hcontact").val();
  let hfee = $("#hfee").val();
  let hcategory = $("#hcategory").val();
  let hcancle = $("#hcancle").val();
  let hremark = $("#hremark").val();

  let himage = $("#himage")[0].files[0];

  console.log(hname);
  console.log(hlocation);
  console.log(hlocationmap);
  console.log(hmail);
  console.log(hcontact);
  console.log(hfee);
  console.log(hcategory);
  console.log(hcancle);
  console.log(hremark);
  console.log(himage);

  const formdata = new FormData();

  formdata.append("hotelName", hname);
  formdata.append("location", hlocation);
  formdata.append("hotelLocationMap", hlocationmap);
  formdata.append("hotelEmail", hmail);
  formdata.append("contactNo", hcontact);
  formdata.append("fee", hfee);
  formdata.append("category", hcategory);
  formdata.append("cancellation", hcancle);
  formdata.append("remarks", hremark);
  formdata.append("hotelImage", himage);

  $.ajax({
    url: hotelBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "POST",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllHotels();
        clearAllHotels();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function updateHotel() {
  let hId = $("#hId").val();
  let hname = $("#hname").val();
  let hlocation = $("#hlocation").val();
  let hlocationmap = $("#hlocationmap").val();
  let hmail = $("#hmail").val();
  let hcontact = $("#hcontact").val();
  let hfee = $("#hfee").val();
  let hcategory = $("#hcategory").val();
  let hcancle = $("#hcancle").val();
  let hremark = $("#hremark").val();

  let himage = $("#himage")[0].files[0];

  const formdata = new FormData();

  formdata.append("hotelId", hId);
  formdata.append("hotelName", hname);
  formdata.append("location", hlocation);
  formdata.append("hotelLocationMap", hlocationmap);
  formdata.append("hotelEmail", hmail);
  formdata.append("contactNo", hcontact);
  formdata.append("fee", hfee);
  formdata.append("category", hcategory);
  formdata.append("cancellation", hcancle);
  formdata.append("remarks", hremark);
  formdata.append("hotelImage", himage);

  $.ajax({
    url: hotelBaseUrl,
    processData: false,
    contentType: false,
    cache: false,
    method: "PUT",
    data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllHotels();
        clearAllHotels();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function deleteHotel() {
  let hid = $("#hId").val();

  $.ajax({
    url: hotelBaseUrl + "?id=" + hid,
    processData: false,
    contentType: false,
    cache: false,
    method: "DELETE",
    // data: formdata,
    success: function (res) {
      if (res.code == 200) {
        alert(res.message);
        loadAllHotels();
        clearAllHotels();
      }
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function loadAllHotels() {
  $("#hotel-tbl-dat").empty();

  $.ajax({
    url: hotelBaseUrl,
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
        <td class="px-4 text-center">${hotel.hotelLocationMap}</td>
        <td class="px-4 text-center">${hotel.hotelEmail}</td>
        <td class="px-4 text-center">${hotel.contactNo}</td>
        <td class="px-4 text-center">${hotel.hotelFee}</td>
        <td class="px-5 text-center">${hotel.category}</td>
        <td class="px-4 text-center">${hotel.cancellation}</td>
        <td><img src="data:guideImg/png;base64,${hotel.hotelImage}" width="150"/></td>
        <td class="px-4 text-center">${hotel.remarks}</td>
        </tr>`;

        $("#hotel-tbl-dat").append(row);
      }
      bindClickEventHotels();
    },
    error: function (ob) {
      alert(ob.responseJSON.message);
    },
  });
}

function bindClickEventHotels() {
  $("#hotel-tbl-dat > tr").click(function () {
    // $("#gid-preview").html("");
    let id = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let location = $(this).children().eq(2).text();
    let map = $(this).children().eq(3).text();
    let email = $(this).children().eq(4).text();
    let contact = $(this).children().eq(5).text();
    let fee = $(this).children().eq(6).text();
    let category = $(this).children().eq(7).text();
    let cancelfee = $(this).children().eq(8).text();
    let himage = $(this).children().eq(9).find("img").attr("src");
    let remark = $(this).children().eq(10).text();

    console.log("hotel table clicked");

    // $("#gimage").val("");
    // $("#gidimage").val("");

    $("#hId").val(id);
    $("#hname").val(name);
    $("#hlocation").val(location);
    $("#hlocationmap").val(map);
    $("#hmail").val(email);
    $("#hcontact").val(contact);
    $("#hfee").val(fee);
    $("#hcancle").val(cancelfee);
    $("#hcategory").val(category);
    $("#hotelimageplace").attr("src", himage);
    $("#hremark").val(remark);
  });
}

function clearAllHotels() {
  $("#hId").val("");
  $("#hname").val("");
  $("#hlocation").val("");
  $("#hlocationmap").val("");
  $("#hmail").val("");
  $("#hcontact").val("");
  $("#hfee").val("");
  $("#hcancle").val("");
  $("#hcategory").val("");
  $("#hotelimageplace").attr("src", "");
  $("#hremark").val("");
  $("#himage").val("");
}
