let accordions = document.querySelectorAll('.accordion')
openAccordion = () => {
    accordions.forEach((accordion) => {
        accordion.onclick = () => {
            // console.log(accordion)
            accordions.forEach((subAccordion) => {
                subAccordion.classList.remove('active')
            })
            accordion.classList.add('active')
        }
        accordion.querySelector('.accordion-heading').onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                accordion.onclick()
            }
        }
    })
}
openAccordion()