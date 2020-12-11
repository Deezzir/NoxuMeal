window.onload = function () {
    const menuBtn = document.querySelector(".menu-icon span");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    const sign = document.querySelector(".sign-items");
    const signs = document.querySelector(".sign-items").querySelectorAll("li");
    const logo = document.querySelector(".logo");

    menuBtn.onclick = () => {
        signs.forEach(each => items.appendChild(each));
        items.classList.add("active");
        //sign.classList.add("active");
        menuBtn.classList.add("hide");
        cancelBtn.classList.add("show");
        logo.classList.add("cntr");
        closeForm("register");
        closeForm("login");
        closeForm("cart")
        on();
    }

    cancelBtn.onclick = () => {
        if (cancelBtn.classList.contains("show")) {
            items.classList.remove("active");
            items.removeChild(items.lastElementChild);
            items.removeChild(items.lastElementChild);
            signs.forEach(each => sign.appendChild(each))
            menuBtn.classList.remove("hide");
            cancelBtn.classList.remove("show");
            cancelBtn.style.color = "white";
            logo.classList.remove("cntr");
            off();
        }
    }

    const dropdown = document.getElementsByClassName("dropdown-btn");

    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }

    const add = document.querySelector(".add")
    const all = document.querySelector(".list")
    const table = document.getElementById("table")
    const addForm =document.getElementById("addForm")

    if(add && all) {
        add.addEventListener("click", function() {
            add.classList.add("active")
            all.classList.remove("active")

            table.style.display = "none"
            addForm.style.display = "block"
        })


        all.addEventListener("click",function () {
            add.classList.remove("active")
            all.classList.add("active")

            table.style.display = "block"
            addForm.style.display = "none"
        });
    }
}

function reportWindowSize() {
    if(window.innerWidth >= 1140) {
        document.querySelector(".cancel-icon").click();
    }
}


