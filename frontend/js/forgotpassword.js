function forgotPassword() {

  const resetEmailValue = document.getElementById("resetPageEmail").value;
  // const resetPasswordValue = document.getElementById("resetPagePassword").value;
  // const resetReenterPasswordValue = document.getElementById(
  //   "resetReenterPagePassword"
  // ).value;

  document.getElementById("resetPageEmailInnerHtml").innerHTML = " ";
  // document.getElementById("resetPagePasswordInnerHtml").innerHTML = " ";
  // document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML = " ";

  // console.log("password", resetPasswordValue);
  // console.log("reenterpassword", resetReenterPasswordValue);


  fetch("http://127.0.0.1:8000/forgotPassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: resetEmailValue,
        // password: resetPasswordValue,
        // reenteredpassword: resetReenterPasswordValue
      }),
    })
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
        console.log({ responseJson });
        if (responseJson == "password updated successfully") {
          alert(responseJson);
          // window.location.href = "/frontend/html/index.html";
          // window.location.href = "../html/index.html";
        }
        else if(responseJson == "need to signup, no user found"){
          document.getElementById("resetPageEmailInnerHtml").innerHTML ="email doesn't exist";
        }
        // else if(responseJson == "entered password is same as old one, please enter the new password"){
        //   document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML ="Password is same as old one";
        // }
        alert(responseJson);
      })
      .catch((error) => {
        console.log("error",error.message);

        if (error.message == "The email field is required" || error.message == "The email address is not valid") 
            document.getElementById("resetPageEmailInnerHtml").innerHTML =error.message;
        // if (error.message == "The password field is required" || error.message == "The password must contain at least 1 digit, 1 uppercase letter, and 1 lowercase letter,and 1 special character and must be 6-16 characters") 
        //     document.getElementById("resetPagePasswordInnerHtml").innerHTML =error.message;   
        // if (error.message == "Password Mismatching") 
        //     document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML =error.message;              

        // alert("error catch");
      });
}
