
function getShipmentDetails() {

  role = localStorage.getItem("role")


    let datastreamElement = document.getElementById("datastreamButton");
    // let shipmentsElement = document.getElementById("shipmentsButton");

    console.log("role from home.js", role)    
    let element1 = document.getElementById("datastreamButton");
    let hidden = datastreamElement.getAttribute("hidden");

    
        if (role == "Admin") {
         //   element.removeAttribute("hidden");
         datastreamElement.removeAttribute("hidden");
        //  shipmentsElement.removeAttribute("hidden");
        } else if (role == "User") {
         // element.setAttribute("hidden", "hidden");
         datastreamElement.setAttribute("hidden", "hidden");
        //  shipmentsElement.setAttribute("hidden", "hidden");

        }
        
  fetch("http://127.0.0.1:8000/getShipments", {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log({ responseJson });
      // roleCheck()
      
      //token verification conditionsq
      if (responseJson?.detail == "Token Expired") {
        alert("token expired");
        // window.location.href = "/frontend/html/index.html";
        window.location.href = "../html/index.html";
      } else if (responseJson?.detail == "Can't get shipment data") {
        alert("can't get data from db");
        // window.location.href = "/frontend/html/index.html";
        window.location.href = "../html/index.html";
      }

      console.log("mano katta",responseJson);


      if(localStorage.getItem("role")=="Admin"){
        for (var i = 0; i < responseJson.length; i++) {
          var row =
            "<tr>" +
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
            "</td>" 
            +
            "<td>" +
            responseJson[i].NOC_Number +
            "</td>" 
            +
            "<td>" +
            responseJson[i].Batch_Id +
            "</td>" 
            +
            "<td>" +
            responseJson[i].Serial_Number +
            "</td>" 
            +
            "<td>" +
            responseJson[i].Shipment_Description +
            "</td>" 
            +
            "<td>" +
            responseJson[i].Created_by +
            "</td>" 
            +
            "</tr>";
          document.getElementById("result").innerHTML += row;
        }
      }
      else 
      if(localStorage.getItem("role")=="User"){
        for (var i = 0; i < responseJson.length; i++) {
          // if(responseJson[i].Created_by=="User"){
          if(responseJson[i].User_Id==localStorage.getItem("userId")){
            var row =
            "<tr>" +
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
            "</td>" 
            +
            "<td>" +
            responseJson[i].NOC_Number +
            "</td>" 
            +
            "<td>" +
            responseJson[i].Batch_Id +
            "</td>" 
            +
            "<td>" +
            responseJson[i].Serial_Number +
            "</td>" 
            +
            "<td>" +
            responseJson[i].Shipment_Description +
            "</td>" 
            +
            "<td>" +
            responseJson[i].Created_by +
            "</td>" 
            +
            "</tr>";
          document.getElementById("result").innerHTML += row;

          }
         
        }
      }

      
    })
    .catch((error) => {
      console.log(error);
      alert("error catch", error);
    });
}
