let select = document.querySelector('.teams-select');
let list = document.querySelector('.teams-list');
let icon = document.querySelector('.teams-select__item');

function showTeamList (){
    list.classList.toggle('teams-list-active');
    icon.classList.toggle('teams-select__item-active');
}

select.addEventListener('click', showTeamList);