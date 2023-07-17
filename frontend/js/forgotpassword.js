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

  //validating email
  if (resetEmailValue == "") {
    document.getElementById("resetPageEmailInnerHtml").innerHTML =
      "please enter the email";
  } else if (resetEmailValue.match(validRegex)) {
    validEmail = true;
    null;
  } else
    document.getElementById("resetPageEmailInnerHtml").innerHTML =
      "please enter the valid email";

  //validating password
  if (resetPasswordValue == "" || resetReenterPasswordValue == "") {
    document.getElementById("resetPagePasswordInnerHtml").innerHTML =
      "please enter the password";
    document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML =
      "please re-enter the password";
  } else if (resetPasswordValue === resetReenterPasswordValue) {
    validPassword = true;
  } else
    document.getElementById("resetReenterPagePasswordInnerHtml").innerHTML =
      "please enter the same password";
      

  if (validEmail == true && validPassword == true) {
    fetch("http://127.0.0.1:8000/forgotPassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: resetEmailValue,
        password: resetPasswordValue,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log({ responseJson });
        if (responseJson == "password updated successfully") {
          alert(responseJson);
          window.location.href = "/frontend/html/index.html";
        }
        alert(responseJson);
      })
      .catch((error) => {
        console.log(error);
        alert("error catch");
      });
  }
}
