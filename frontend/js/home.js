function roleCheck(){
   role = localStorage.getItem("role")
   username = localStorage.getItem("username")

   let datastreamElement = document.getElementById("datastreamButton");

   document.getElementById("loggedInUser").innerHTML= username
   
   console.log("role from home.js", role)    
   
       if (role == "Admin") {
        datastreamElement.removeAttribute("hidden");
       } else if (role == "User") {
        datastreamElement.setAttribute("hidden", "hidden");
       }

}