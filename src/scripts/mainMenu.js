(function () {
    let mainMenu = document.querySelectorAll('.menu__item');
    let sections = document.querySelectorAll('.main');
    
    function onMenu (){
        mainMenu.forEach((item) => {
            item.classList.remove('menu__item-active')
        });
        sections.forEach((item) => {
            item.classList.remove('main-active')
        });
        
        this.classList.add('menu__item-active');
        let menuId = this.getAttribute('data-menu');
        sections.forEach((item) => {
            if(item.getAttribute('data-section') == menuId)
            item.classList.add('main-active')});
        }
    
    mainMenu.forEach((item) => {
        item.addEventListener('click', onMenu);
    });
})();

