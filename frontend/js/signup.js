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

  var hostname = localStorage.getItem("hostname")
  
  
      fetch(`http://${hostname}:8000/createUser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: signupUsernameValue,
          email: signupEmailValue,
          password: signupPasswordValue,
          reenterpassword: signupReenterPasswordValue,
          role:"User"
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
          if (responseJson == "user is created successfully") {
            alert(responseJson);
            // window.location.href = "/frontend/html/index.html";
            window.location.href = "../html/index.html";
          }
          alert(responseJson);
        })
        
        .catch((error) => {
          console.log("error",error.message);

          //field validations
          if (error.message == "The Username field is required" || error.message == "The Username must be letters only") {
            document.getElementById("usernameInnerHtml").innerHTML =error.message;
          }
          else if (error.message == "The email field is required" || error.message == "The email address is not valid") 
              document.getElementById("emailInnerHtml").innerHTML =error.message;
          else if (error.message == "The password field is required" || error.message == "The password must contain at least 1 digit, 1 uppercase letter, and 1 lowercase letter,and 1 special character and must be 6-16 characters") 
              document.getElementById("passwordInnerHtml").innerHTML =error.message;   
          else if (error.message == "Password Mismatching") 
              document.getElementById("reenterPasswordInnerHtml").innerHTML =error.message;              

          alert(error.message);
        });
}
