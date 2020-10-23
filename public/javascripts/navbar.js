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
}

function reportWindowSize() {
    if(window.innerWidth >= 1140) {
        document.querySelector(".cancel-icon").click();
    }
}

