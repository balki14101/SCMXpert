function resetPassword() {

    const resetPasswordValue = document.getElementById("resetPagePassword").value;
    const resetReenterPasswordValue = document.getElementById(
      "resetReenterPagePassword"
    ).value;
  
    // setting innerhtml values
    email =  document.getElementById("resetPageEmailInnerHtml").innerText
    document.getElementById("resetPagePasswordInnerHtml").innerHTML = " ";
    document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML = " ";
  
    // hostname
   var hostname = localStorage.getItem("hostname")

    fetch(`http://${hostname}:8000/resetpassword`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: resetPasswordValue,
          reenteredpassword: resetReenterPasswordValue
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
          //With the response
        .then((responseJson) => {
          console.log({ responseJson });
          if (responseJson == "password updated successfully") {
            alert(responseJson);
            // window.location.href = "/frontend/html/index.html";
            window.location.href = "../html/index.html";
          }
          else if(responseJson == "entered password is same as old one, please enter the new password"){
            document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML ="Password is same as old one";
          }
          alert(responseJson);
        })
        .catch((error) => {
          console.log("error",error.message);
  
          if (error.message == "The password field is required" || error.message == "The password must contain at least 1 digit, 1 uppercase letter, and 1 lowercase letter,and 1 special character and must be 6-16 characters") 
              document.getElementById("resetPagePasswordInnerHtml").innerHTML =error.message;   
          if (error.message == "Password Mismatching") 
              document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML =error.message;              
  
        });
  }
  