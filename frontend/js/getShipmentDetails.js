function getShipmentDetails() {
  // data from localStorage
  role = localStorage.getItem("role");
  var hostname = localStorage.getItem("hostname")

  // nav-button
  let datastreamElement = document.getElementById("datastreamButton");

  // role condition
  if (role == "Admin") {
    datastreamElement.removeAttribute("hidden");
  } else if (role == "User") {
    datastreamElement.setAttribute("hidden", "hidden");
  }

  // api
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

      // shows all shipments for admin
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

          document.getElementById("result").innerHTML += row;
        }
      $('#myTable').dataTable();

      }
      // to show shipments created by the particular user 
      else if (localStorage.getItem("role") == "User") { 
        for (var i = 0; i < responseJson.length; i++) {
          if (responseJson[i].User_Id == localStorage.getItem("userId")) {
            var row =
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
