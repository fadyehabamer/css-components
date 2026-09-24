var pics = document.querySelectorAll(".container .gallery img")
for(let i = 0 ; i< pics.length ; i++){
    pics[i].addEventListener("click" , (e)=>{


        let overlay=document.createElement("div");
        overlay.className="overlay"
        document.body.appendChild(overlay)


        let popupbox=document.createElement("div");
        popupbox.className="popupbox"
     

        let popupimg = document.createElement("img")
        popupimg.src = pics[i].src
        popupimg.alt = pics[i].alt

        popupbox.appendChild(popupimg)

        document.body.appendChild(popupbox)

        let x = document.createElement("span")
        let x_text = document.createTextNode("X")
        x.appendChild(x_text)
        x.className="close"
        x.setAttribute("role", "button")
        x.setAttribute("tabindex", "0")
        x.setAttribute("aria-label", "Close")


        popupbox.appendChild(x)
        x.focus()


    })
    // keyboard access: open the popup with Enter / Space
    pics[i].addEventListener("keydown" , (e)=>{
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            pics[i].click()
        }
    })
}

document.addEventListener("click" , (e) => {
    if(e.target.className == "close" ){
        e.target.parentElement.remove()
        document.querySelector(".overlay").remove()
    }
})

// keyboard access: Enter / Space on the close button, Escape anywhere
document.addEventListener("keydown" , (e) => {
    let close = document.querySelector(".popupbox .close")
    if (!close) return
    if (e.key === "Escape" || (e.target === close && (e.key === "Enter" || e.key === " "))) {
        e.preventDefault()
        close.click()
    }
})