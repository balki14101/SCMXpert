function createShipment() {
  var shipmentNumberValue = document.getElementById("shipmentNumber").value;
  var containerNumberValue = document.getElementById("containerNumber").value;
  var deliveryDateValue = document.getElementById("deliveryDate").value;
  var poNumberValue = document.getElementById("poNumber").value;
  var deliveryNumberValue = document.getElementById("deliveryNumber").value;
  var nocNumberValue = document.getElementById("nocNumber").value;
  var batchIdValue = document.getElementById("batchId").value;
  var serialNumberValue = document.getElementById("serialNumber").value;
  var shipmentDescriptionValue = document.getElementById(
    "shipmentDescription"
  ).value;

  fetch("http://127.0.0.1:8000/createShipment", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Shipment_Number: shipmentNumberValue,
      Container_Number: containerNumberValue,
      Delivery_Date: deliveryDateValue,
      PO_Number: poNumberValue,
      Delivery_Number: deliveryNumberValue,
      NOC_Number: nocNumberValue,
      Batch_Id: batchIdValue,
      Serial_Number: serialNumberValue,
      Shipment_Description: shipmentDescriptionValue,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("shipment created successfully", responseJson);

      if (responseJson == "shipment created successfully")
      alert(responseJson);
      else if (responseJson?.detail == "Token Expired") {
        alert(responseJson?.detail);
        // window.location.href = "/frontend/html/index.html";
        window.location.href = "../html/index.html";
      }else if (responseJson?.detail[0]?.msg) {
        alert(responseJson?.detail[0]?.msg);
      }

    })
    .catch((error) => {
      console.log(error);
      alert("catch error while creating shipment");
    });
}

function clearData() {
  document.getElementById("shipmentNumber").value = "";
  document.getElementById("containerNumber").value = "";
  document.getElementById("poNumber").value = "";
  document.getElementById("deliveryNumber").value = "";
  document.getElementById("nocNumber").value = "";
  document.getElementById("batchId").value = "";
  document.getElementById("serialNumber").value = "";
  document.getElementById("shipmentDescription").value = "";
}
