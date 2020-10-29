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

function openForms(form){
    setTimeout("500");
    if(form === "login") {
        openForm("login");
    } else if(form === "register"){
        openForm("register");
    }
}

function clearForm(form) {
    if(form === "login") {
        let pswrd = document.getElementById('lpswrd')
        let email = document.getElementById('lemail')
        if (pswrd) { pswrd.style.display = 'none'; }
        if (email) { email.style.display = 'none'; }

        document.getElementById('l1').value = '';
        document.getElementById('l2').value = '';

    } else if (form === "register") {
        let lname = document.getElementById('lname')
        let fname = document.getElementById('fname')
        let pswrd = document.getElementById('rpswrd')
        let email = document.getElementById('remail')
        if (pswrd) { pswrd.style.display = 'none'; }
        if (email) { email.style.display = 'none'; }
        if (lname) { lname.style.display = 'none'; }
        if (fname) { fname.style.display = 'none'; }
    }
}


