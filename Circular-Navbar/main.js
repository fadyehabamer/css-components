let div = document.querySelector("#test"),
    nav = document.getElementById("nav")
div.addEventListener("click", () => {
    nav.classList.toggle("active")
    if (nav.classList.contains("active")) {
        div.innerHTML = 
        // `<img src="logo.png" style =" width:30px; , height:30px; " >`      
        "✌"
        
    } else {
        div.innerHTML = "✊"
    }
    div.setAttribute("aria-expanded", nav.classList.contains("active"))
})
div.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        div.click()
    }
})