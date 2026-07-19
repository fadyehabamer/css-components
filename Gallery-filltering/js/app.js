const filterBtn  = document.querySelector("#filter-btns").children;
const item = document.querySelector(".gallery").children;
for (let i = 0 ; i < filterBtn.length ; i++){
    filterBtn[i].addEventListener('click' , function() {
        for ( let j = 0; j < filterBtn.length; j++){
            filterBtn[j].classList.remove('active');
        }
        this.classList.add('active');
        const target = this.getAttribute('data-target');
        for ( let n = 0; n < item.length ; n++ ){
            item[n].style.display = "none";
            if( item[n].getAttribute('data-id') == target ){
                item[n].style.display = "block";
            }
            if (target == 'all'){
                item[n].style.display = "block";
            }
        }
    });
}