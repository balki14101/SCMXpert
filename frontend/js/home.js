function roleCheck(){
    role = localStorage.getItem("role")

    console.log("role from home.js", role)    
    let element = document.getElementById("button");
    let hidden = element.getAttribute("hidden");

    
        if (role == "Admin") {
           element.removeAttribute("hidden");
        } else if (role == "User") {
           element.setAttribute("hidden", "hidden");
        }

}