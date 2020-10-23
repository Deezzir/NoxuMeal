 function openForm(form) {
    document.getElementById(form).style.display = "block";
    if (document.querySelector(".nav-items").classList.contains("active")) {
        document.querySelector(".cancel-icon").click();
    }
    on();
 }

function closeForm(form) {
    document.getElementById(form).style.display = "none";
    off();
}

 function on() {
    document.getElementById("overlay").style.display = "block";
    document.querySelector("body").classList.add("ovrl");
}

 function off() {
        document.getElementById("overlay").style.display = "none";
        document.querySelector("body").classList.remove("ovrl");
}




