(function login() {
  const fonts = ["cursive"];
  let captchaValue = "";
  var validRegex =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

  function gencaptcha() {
    let value = btoa(Math.random() * 100000);
    value = value.substring(0, 6 + Math.random());
    captchaValue = value;
  }

  function setcaptcha() {
    let html = captchaValue
      .split("")
      .map((char) => {
        const rotate = -20 + Math.trunc(Math.random() * 30);
        const font = Math.trunc(Math.random() * fonts.length);
        return `<span
            style="
            transform:rotate(${rotate}deg);
            font-family:${font[font]};
            "
           >${char} </span>`;
      })
      .join("");
    document.querySelector(".login_form #captcha .preview").innerHTML =
      captchaValue;
  }

  function initCaptcha() {
    document
      .querySelector(".login_form #captcha .captcha_refersh")
      .addEventListener("click", function () {
        gencaptcha();
        setcaptcha();
      });

    gencaptcha();
    setcaptcha();

  }
  initCaptcha();

  function loginCheck(validCaptcha) {
    console.log("sdfds", document.getElementById("pwd").value);
    let enteredEmail = document.getElementById("email").value;
    let enteredPassword = document.getElementById("pwd").value;

    if (validCaptcha) {
        fetch("http://127.0.0.1:8000/loginUser", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
        })
        //checking validations
          .then(response => {
            if(response.ok){
              console.log("success",response)
              return response.json()
            } 
            console.log("fail",response)
            
            return response.json()
            .then(response => {throw new Error(response.detail)})
          })
          //With the response
          .then((responseJson) => {
            console.log({ responseJson });
            console.log("status",responseJson.userId?.$oid);
            if (responseJson.message == "user already exists") {
              document.getElementById("emailInnerHtml").innerHTML =""
            document.getElementById("passwordInnerHtml").innerHTML ="";
              document.getElementById("invalidCredentials").innerHTML = "";
              

              // window.location.href = "/frontend/home.html";
              // window.location.href = "/frontend/html/home.html";
              window.location.href = "../html/home.html";
              localStorage.setItem("token", responseJson.token);
              localStorage.setItem("role", responseJson.role);
              localStorage.setItem("userId", responseJson.userId?.$oid);
              localStorage.setItem("username", responseJson.username);

            } 
            else{
              document.getElementById("emailInnerHtml").innerHTML =""
            document.getElementById("passwordInnerHtml").innerHTML ="";
            document.getElementById("invalidCredentials").innerHTML ="invalid credentials";
            alert("invalid credentials")
            }
            
          })
          .catch((error) => {
            console.log("error",error.message);
            //field validations
            if (error.message == "The email field is required" || error.message == "The email address is not valid") {
              document.getElementById("emailInnerHtml").innerHTML =error.message;
            }
            else if (error.message == "The password field is required" || error.message == "The password must contain at least 1 digit, 1 uppercase letter, and 1 lowercase letter,and 1 special character and must be 6-16 characters") 
                document.getElementById("passwordInnerHtml").innerHTML =error.message;

          });
      }
  }

  //captcha validation
  document
    .querySelector(".login_form .form_button")
    .addEventListener("click", function () {
      let inputcaptchavalue = document.querySelector(
        ".login_form #captcha input"
      ).value;

      if (inputcaptchavalue === captchaValue) {
        loginCheck(true);
      } else {
        alert("Invalid Captcha");
        loginCheck(false);
      }
    });

  document.querySelector(".login_form .form_button");
})();
