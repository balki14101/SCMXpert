function roleCheck() {
  // getting logged-in username and role
  role = localStorage.getItem("role");
  username = localStorage.getItem("username");

  let datastreamElement = document.getElementById("datastreamButton");

  //setting username in innerHtml
  document.getElementById("loggedInUser").innerHTML = username;

  if (role == "Admin") {
    datastreamElement.removeAttribute("hidden");
  } else if (role == "User") {
    datastreamElement.setAttribute("hidden", "hidden");
  }
}
