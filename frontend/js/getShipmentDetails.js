function getShipmentDetails() {
  role = localStorage.getItem("role");
  var hostname = localStorage.getItem("hostname")


  let datastreamElement = document.getElementById("datastreamButton");

  console.log("role from home.js", role);

  if (role == "Admin") {
    datastreamElement.removeAttribute("hidden");
  } else if (role == "User") {
    datastreamElement.setAttribute("hidden", "hidden");
  }

  fetch(`http://${hostname}:8000/getShipments`, {
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
      } else if (responseJson?.detail == "Can't get shipment data") {
        alert("can't get data from db");
        // window.location.href = "/frontend/html/index.html";
        window.location.href = "../html/index.html";
      }

      console.log("mano katta", responseJson);

      if (localStorage.getItem("role") == "Admin") {
        for (var i = 0; i < responseJson.length; i++) {
          var row =
            // "<tr >" +
            "<td>" +
            responseJson[i].Shipment_Number +
            "</td>" +
            "<td>" +
            responseJson[i].Container_Number +
            "</td>" +
            "<td>" +
            responseJson[i].Delivery_Date +
            "</td>" +
            "<td>" +
            responseJson[i].PO_Number +
            "</td>" +
            "<td>" +
            responseJson[i].Delivery_Number +
            "</td>" +
            "<td>" +
            responseJson[i].NOC_Number +
            "</td>" +
            "<td>" +
            responseJson[i].Batch_Id +
            "</td>" +
            "<td>" +
            responseJson[i].Serial_Number +
            "</td>" +
            "<td>" +
            responseJson[i].Shipment_Description +
            "</td>" +
            "<td>" +
            responseJson[i].Created_by +
            "</td>";
          // +
          // "</tr>";
          document.getElementById("result").innerHTML += row;
        }
      $('#myTable').dataTable();

      } else if (localStorage.getItem("role") == "User") {
        for (var i = 0; i < responseJson.length; i++) {
          // if(responseJson[i].Created_by=="User"){
          if (responseJson[i].User_Id == localStorage.getItem("userId")) {
            var row =
              // "<tr>" +
              // `<tr style="text-align: center; background-color: blue;padding:16px">` +

              `<td style="text-align: center;padding:16px">` +
              responseJson[i].Shipment_Number +
              "</td>" +
              "<td>" +
              responseJson[i].Container_Number +
              "</td>" +
              "<td>" +
              responseJson[i].Delivery_Date +
              "</td>" +
              "<td>" +
              responseJson[i].PO_Number +
              "</td>" +
              "<td>" +
              responseJson[i].Delivery_Number +
              "</td>" +
              "<td>" +
              responseJson[i].NOC_Number +
              "</td>" +
              "<td>" +
              responseJson[i].Batch_Id +
              "</td>" +
              "<td>" +
              responseJson[i].Serial_Number +
              "</td>" +
              "<td>" +
              responseJson[i].Shipment_Description +
              "</td>" +
              "<td>" +
              responseJson[i].Created_by +
              "</td>";
            // +
            // "</tr>";
            document.getElementById("result").innerHTML += row;
          }
        }
      $('#myTable').dataTable();

      }
    })
    .catch((error) => {
      console.log(error);
      alert("error catch", error);
    });
}
