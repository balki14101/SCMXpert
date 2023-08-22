function forgotPassword() {

  // getting entered email
  const resetEmailValue = document.getElementById("resetPageEmail").value;
  
  // innerHtml
  document.getElementById("resetPageEmailInnerHtml").innerHTML = " ";
  
  // hostname
  var hostname = localStorage.getItem("hostname")


  fetch(`http://${hostname}:8000/forgotPassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: resetEmailValue,
      }),
    })
    //checking validations
    .then(response => {
      if(response.ok){
        console.log("success signup",response)
        return response.json()
      } 
      console.log("fail signup",response)
      
      return response.json()
      .then(response => {throw new Error(response.detail)})
    })
    // with success response
      .then((responseJson) => {
        console.log({ responseJson });
        if (responseJson == "password updated successfully") {
          alert(responseJson);
          // window.location.href = "/frontend/html/index.html";
          // window.location.href = "../html/index.html";
        }
        else if(responseJson == "need to signup, no user found"){
          document.getElementById("resetPageEmailInnerHtml").innerHTML ="email doesn't exist";
        }
        alert(responseJson);
      })
      .catch((error) => {
        console.log("error",error.message);
        
        //field validation
        if (error.message == "The email field is required" || error.message == "The email address is not valid") 
            document.getElementById("resetPageEmailInnerHtml").innerHTML =error.message;
        
      });
}
