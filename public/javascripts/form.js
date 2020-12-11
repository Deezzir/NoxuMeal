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
    } else if(form === "cart") {
        openForm("cart")
    }
}

function clearForm(form) {
    if(form === "login") {
        let pswrd = document.getElementById('lpswrd')
        let email = document.getElementById('lemail')
        let error = document.getElementById('error')
        if (pswrd) { pswrd.style.display = 'none'; }
        if (email) { email.style.display = 'none'; }
        if (error) { error.style.display = 'none'; }

        document.getElementById('l1').value = '';
        document.getElementById('l2').value = '';

    } else if (form === "register") {
        let lname = document.getElementById('lname')
        let fname = document.getElementById('fname')
        let pswrd = document.getElementById('rpswrd')
        let email = document.getElementById('remail')
        let error = document.getElementById('error')

        if (error) { error.style.display = 'none'; }
        if (pswrd) { pswrd.style.display = 'none'; }
        if (email) { email.style.display = 'none'; }
        if (lname) { lname.style.display = 'none'; }
        if (fname) { fname.style.display = 'none'; }
    }
}

 function myFunction() {
     var input, filter, table, tr, td, i, txtValue;
     input = document.getElementById("myInput");
     filter = input.value.toUpperCase();
     table = document.getElementById("myTable");
     tr = table.getElementsByTagName("tr");

     for (i = 0; i < tr.length; i++) {
         td = tr[i].getElementsByTagName("td")[0];
         if (td) {
             txtValue = td.textContent || td.innerText || td.childNodes[0].value
             if (tr[i].id.length === 0 && txtValue.toUpperCase().indexOf(filter) > -1) {
                 tr[i].style.display = "";
             } else if (tr[i].classList.contains("ractive") && tr[i].id.length !== 0
                 && txtValue.toUpperCase().indexOf(filter) > -1) {
                 tr[i].style.display = "";
             } else {
                 tr[i].style.display = "none";
             }
         }
     }
 }
 function addField (argument) {
     const row = document.getElementById(argument)
     const button = document.getElementById(argument + "-btn")
     if (button.innerHTML === "SELECT") {
         row.style.display="table-row"
         row.classList.add("ractive")
         button.innerHTML = "CLOSE"
         button.style.backgroundColor = "red"
     } else {
         row.style.display = "none"
         button.innerHTML = "SELECT"
         row.classList.remove("ractive")
         button.style.backgroundColor = "#24454c"
     }
 }

 function Minus(id) {
     let input = document.getElementById(id)
     let value = parseInt(input.value.toString())

     console.log(typeof value)
     console.log(value)

     if(value > 1) {
         value -= 1
     } else {
         value = 0
     }

     input.value = value
 }

function Plus(id) {
     let input = document.getElementById(id)
     let value = parseInt(input.value.toString())

     if(value < 100) {
         value = value + 1
     } else {
         value = 100
     }

     input.value = value

 }


