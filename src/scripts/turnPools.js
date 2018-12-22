const menu = document.querySelectorAll('.pools-menu__item');
const pools = document.querySelectorAll('.pools-list__item');


function choosePool () {
    menu.forEach((item) => {
        item.classList.remove('pools-menu__item-active')
    });
    pools.forEach((item) => {
        item.classList.remove('pools-list__item-active')
    });
    
    this.classList.add('pools-menu__item-active');
    let group = this.getAttribute('data-group');
    pools.forEach((item) => {
        if(item.getAttribute('data-group') === group){
        item.classList.add('pools-list__item-active');
        }
    });
}


menu.forEach((item) => {
    item.addEventListener('click', choosePool);
})
