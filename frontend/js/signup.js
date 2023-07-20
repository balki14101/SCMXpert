var validEmail = false;
var validPassword = false;

function signup() {
  const signupUsernameValue = document.getElementById("signupUsername").value;
  const signupEmailValue = document.getElementById("signupEmail").value;
  const signupPasswordValue = document.getElementById("enterpassword").value;
  const signupReenterPasswordValue =
    document.getElementById("reenterpassword").value;

  // signupUsernameValue.innerHTML = name; // harmless in this case

  document.getElementById("usernameInnerHtml").innerHTML = " ";
  document.getElementById("emailInnerHtml").innerHTML = " ";
  document.getElementById("passwordInnerHtml").innerHTML = " ";
  document.getElementById("reenterPasswordInnerHtml").innerHTML = " ";

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  console.log("password", signupPasswordValue);
  console.log("reenterpassword", signupReenterPasswordValue);

  //validating username
  if (signupUsernameValue == "") {
    document.getElementById("usernameInnerHtml").innerHTML =
      "please enter the username";
  }

  //validating email
  if (signupEmailValue == "") {
    document.getElementById("emailInnerHtml").innerHTML =
      "please enter the email";
  } else if (signupEmailValue.match(validRegex)) {
    validEmail = true;
    null;
  } else
    document.getElementById("emailInnerHtml").innerHTML =
      "please enter the valid email";

  //validating password
  if (signupPasswordValue == "" || signupReenterPasswordValue == "") {
    document.getElementById("passwordInnerHtml").innerHTML =
      "please enter the password";
    document.getElementById("reenterPasswordInnerHtml").innerHTML =
      "please re-enter the password";
  } else if (signupPasswordValue === signupReenterPasswordValue) {
    validPassword = true;
  } else
    document.getElementById("reenterPasswordInnerHtml").innerHTML =
      "please enter the same password";

  if (validEmail == true && validPassword == true) {
    console.log("usernname and email is not null");
    if (signupPasswordValue === signupReenterPasswordValue) {
      fetch("http://127.0.0.1:8000/createUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: signupUsernameValue,
          email: signupEmailValue,
          password: signupPasswordValue,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log({ responseJson });
          if (responseJson == "user is created successfully") {
            alert(responseJson);
            // window.location.href = "/frontend/html/index.html";
            window.location.href = "../html/index.html";
          }
          alert(responseJson);
        })
        .catch((error) => {
          console.log(error);
          alert("error catch");
        });
      //   window.location.href = "/frontend/html/index.html";
    } else {
      document.getElementById("reenterPasswordInnerHtml").innerHTML =
        "please enter the same password";
    }
  } else alert("kjsdfnjsdf");
}
