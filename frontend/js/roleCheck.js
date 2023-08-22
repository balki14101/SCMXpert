function roleCheck() {
  //get role
  role = localStorage.getItem("role");

  //nav-button
  let datastreamElement = document.getElementById("datastreamButton");

  if (role == "Admin") datastreamElement.removeAttribute("hidden");
  else if (role == "User") datastreamElement.setAttribute("hidden", "hidden");
}
