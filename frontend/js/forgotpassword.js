function forgotPassword() {
  var validEmail = false;
  var validPassword = false;

  const resetEmailValue = document.getElementById("resetPageEmail").value;
  const resetPasswordValue = document.getElementById("resetPagePassword").value;
  const resetReenterPasswordValue = document.getElementById(
    "resetReenterPagePassword"
  ).value;

  document.getElementById("resetPageEmailInnerHtml").innerHTML = " ";
  document.getElementById("resetPagePasswordInnerHtml").innerHTML = " ";
  document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML = " ";

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  console.log("password", resetPasswordValue);
  console.log("reenterpassword", resetReenterPasswordValue);

  // //validating email
  // if (resetEmailValue == "") {
  //   document.getElementById("resetPageEmailInnerHtml").innerHTML =
  //     "please enter the email";
  // } else if (resetEmailValue.match(validRegex)) {
  //   validEmail = true;
  //   null;
  // } else
  //   document.getElementById("resetPageEmailInnerHtml").innerHTML =
  //     "please enter the valid email";

  // //validating password
  // if (resetPasswordValue == "" || resetReenterPasswordValue == "") {
  //   document.getElementById("resetPagePasswordInnerHtml").innerHTML =
  //     "please enter the password";
  //   document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML =
  //     "please re-enter the password";
  // } else if (resetPasswordValue === resetReenterPasswordValue) {
  //   validPassword = true;
  // } else
  //   document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML =
  //     "please enter the same password";
      

  // if (validEmail == true && validPassword == true) {
  //   fetch("http://127.0.0.1:8000/forgotPassword", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: resetEmailValue,
  //       password: resetPasswordValue,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log({ responseJson });
  //       if (responseJson == "password updated successfully") {
  //         alert(responseJson);
  //         // window.location.href = "/frontend/html/index.html";
  //         window.location.href = "../html/index.html";
  //       }
  //       alert(responseJson);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("error catch");
  //     });
  // }

  fetch("http://127.0.0.1:8000/forgotPassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: resetEmailValue,
        password: resetPasswordValue,
        reenteredpassword: resetReenterPasswordValue
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
          window.location.href = "../html/index.html";
        }
        alert(responseJson);
      })
      .catch((error) => {
        console.log("error",error.message);

        if (error.message == "The email field is required" || error.message == "The email address is not valid") 
            document.getElementById("resetPageEmailInnerHtml").innerHTML =error.message;
        if (error.message == "The password field is required" || error.message == "The password must contain at least 1 digit, 1 uppercase letter, and 1 lowercase letter,and 1 special character and must be 6-16 characters") 
            document.getElementById("resetPagePasswordInnerHtml").innerHTML =error.message;   
        if (error.message == "Password Mismatching") 
            document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML =error.message;              

        alert("error catch");
      });
}
