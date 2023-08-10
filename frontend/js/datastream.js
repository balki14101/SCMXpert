// $(document).ready(function(){
//   $('#example').dataTable();
// });
function datastream() {
  var hostname = localStorage.getItem("hostname")

  fetch(`http://${hostname}:8000/datastream`, {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log({ responseJson });
      //token verification conditions
      if (responseJson?.detail == "Token Expired") {
        alert("token expired");
        // window.location.href = "/frontend/html/index.html";
        window.location.href = "../html/index.html";
      } else if (responseJson?.detail == "Could not get data") {
        alert("can't get data from db");
        // window.location.href = "/frontend/html/index.html";
        window.location.href = "../html/index.html";
      }

      for (var i = 0; i < responseJson.length; i++) {
        var row =
          "<tr>" +
          "<td>" +
          responseJson[i].Device_ID +
          "</td>" +
          "<td>" +
          responseJson[i].Battery_Level +
          "</td>" +
          "<td>" +
          responseJson[i].First_Sensor_Temperature +
          "</td>" +
          "<td>" +
          responseJson[i].Route_From +
          "</td>" +
          "<td>" +
          responseJson[i].Route_To +
          "</td>" 
          +
          "</tr>";
      document.getElementById("result").innerHTML += row;
      }
      $('#myTable').dataTable();
    })
    .catch((error) => {
      console.log(error);
      alert("error catch", error);
    });
}
