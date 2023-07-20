(function login() {
  const fonts = ["cursive"];
  let captchaValue = "";
  var validRegex =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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

    //validating email & password
    if (enteredEmail == "") {
      document.getElementById("emailInnerHtml").innerHTML =
        "please enter the email";
    }

    if (enteredPassword == "") {
      document.getElementById("passwordInnerHtml").innerHTML =
        "please enter the password";
    } else document.getElementById("passwordInnerHtml").innerHTML = "";

    if (enteredEmail.match(validRegex)) {
      document.getElementById("emailInnerHtml").innerHTML = "";

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
          .then((response) => response.json())
          .then((responseJson) => {
            console.log({ responseJson });
            if (responseJson.message == "user already exists") {
              document.getElementById("invalidCredentials").innerHTML = "";
              // window.location.href = "/frontend/home.html";
              window.location.href = "../home.html";
              localStorage.setItem("token", responseJson.token);
            } else alert(responseJson);
            document.getElementById("invalidCredentials").innerHTML =
              "invalid credentials";
          })
          .catch((error) => {
            console.log(error);
            alert("error catch");
          });
      }
    } else
      document.getElementById("emailInnerHtml").innerHTML =
        "please enter the valid email";
  }

  document
    .querySelector(".login_form .form_button")
    .addEventListener("click", function () {
      let inputcaptchavalue = document.querySelector(
        ".login_form #captcha input"
      ).value;

      if (inputcaptchavalue === captchaValue) {
        // swal("","Log in","success");
        // alert("");
        loginCheck(true);
      } else {
        // swal("Invalid Captcha");
        alert("Invalid Captcha");
        loginCheck(false);
      }
    });

  document.querySelector(".login_form .form_button");
})();
