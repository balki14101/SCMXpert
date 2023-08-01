function roleCheck(){
    role = localStorage.getItem("role")

    let datastreamElement = document.getElementById("datastreamButton");
    let shipmentsElement = document.getElementById("shipmentsButton");
    
    console.log("role from home.js", role)    
    // console.log("role from home.js", username)    
    let element1 = document.getElementById("datastreamButton");
    let hidden = datastreamElement.getAttribute("hidden");


    
        if (role == "Admin") {
         //   element.removeAttribute("hidden");
         datastreamElement.removeAttribute("hidden");
         shipmentsElement.removeAttribute("hidden");
        } else if (role == "User") {
         // element.setAttribute("hidden", "hidden");
         datastreamElement.setAttribute("hidden", "hidden");
         shipmentsElement.setAttribute("hidden", "hidden");

        }

}