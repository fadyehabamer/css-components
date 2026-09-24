var menu_icon = document.querySelector(".menu")

menu_icon.onclick=function(){
        // this.classList.toggle("open");
        document.querySelector(".sub-menu").classList.toggle("open")

    
}

// keyboard access for the menu icon
menu_icon.onkeydown=function(e){
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        menu_icon.onclick()
    }
}