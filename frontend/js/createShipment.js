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


  document.getElementById("shipmentNumberInnerHtml").innerHTML = " ";
  document.getElementById("containerNumberInnerHtml").innerHTML = " ";
  document.getElementById("deliveryDateInnerHtml").innerHTML = " ";
  document.getElementById("poNumberInnerHtml").innerHTML = " ";
  document.getElementById("deliveryNumberInnerHtml").innerHTML = " ";
  document.getElementById("nocNumberInnerHtml").innerHTML = " ";
  document.getElementById("batchIdInnerHtml").innerHTML = " ";
  document.getElementById("serialNumberInnerHtml").innerHTML = " ";
  document.getElementById("shipmentDescriptionInnerHtml").innerHTML = " ";

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
      Created_by:localStorage.getItem("username"),
      User_Id:localStorage.getItem("userId"),
    }),
  })
    // .then((response) => response.json())
    .then(response => {
      if(response.ok){
        console.log("success signup",response)
        return response.json()
      } 
      console.log("fail signup",response)
      
      return response.json()
      .then(response => {throw new Error(response.detail)})
    })

    .then((responseJson) => {
      console.log("shipment created successfully", responseJson);

      if (responseJson == "shipment created successfully")
      alert(responseJson);
      else if (responseJson == "Duplicate Shipment") {
        alert("Duplicate Shipment");
      }
      else if (responseJson?.detail == "Token Expired") {
        alert(responseJson?.detail);
        // window.location.href = "/frontend/html/index.html";
        window.location.href = "../html/index.html";
      }else if (responseJson?.detail[0]?.msg) {
        alert(responseJson?.detail[0]?.msg);
      }

    })
    .catch((error) => {
      console.log("error",error.message);
      if (error.message == "Token Expired"){
        alert(error?.message);
        // window.location.href = "/frontend/html/index.html";
        window.location.href = "../html/index.html"; 
      }
     else if (error.message == "Shipment_Number field is required and must be integer") 
            document.getElementById("shipmentNumberInnerHtml").innerHTML =error.message;

        else if (error.message == "Container_Number field is required and must be integer") 
        document.getElementById("containerNumberInnerHtml").innerHTML =error.message;    
        
        else if (error.message == "Delivery_Date field is required and must be integer") 
        document.getElementById("deliveryDateInnerHtml").innerHTML =error.message;    

        else if (error.message == "PO_Number field is required and must be integer") 
        document.getElementById("poNumberInnerHtml").innerHTML =error.message; 

        else if (error.message == "Delivery_Number field is required and must be integer") 
        document.getElementById("deliveryNumberInnerHtml").innerHTML =error.message; 

        else if (error.message == "NOC_Number field is required and must be integer") 
        document.getElementById("nocNumberInnerHtml").innerHTML =error.message; 

        else if (error.message == "Batch_Id field is required and must be integer") 
        document.getElementById("batchIdInnerHtml").innerHTML =error.message; 

        else if (error.message == "Serial_Number field is required and must be integer") 
        document.getElementById("serialNumberInnerHtml").innerHTML =error.message;  
        
        else if (error.message == "Shipment_Description field is required") 
        document.getElementById("shipmentDescriptionInnerHtml").innerHTML =error.message;               
       

      alert("invalid details");
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
