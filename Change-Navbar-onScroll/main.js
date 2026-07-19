let nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
    nav.style.position = "fixed"
    nav.style.backgroundColor = "black"
    nav.style.height = "100px";
    if (window.scrollY == 0) {
        nav.style.backgroundColor = "cornflowerblue";
        nav.style.height = "auto";
        nav.style.position = "static"
    }
})