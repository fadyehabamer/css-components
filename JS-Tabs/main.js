let tabs = document.querySelectorAll(".tabs li")
let arrTabs = Array.from(tabs)
// console.log(arrTabs)

let divs = document.querySelectorAll(".content div")
let arrDivs = Array.from(divs)
// console.log(arrDivs)

arrTabs.forEach(ele => {
    ele.addEventListener("click", function (e) {
        arrTabs.forEach(ele => {
            ele.classList.remove('active')
        })
        e.currentTarget.classList.add('active')

        arrDivs.forEach(ele => {
            ele.style.display = 'none'
        })

        //    console.log(e.currentTarget.dataset.cont)
        document.querySelector(e.currentTarget.dataset.cont).style.display = 'block'
    })
})