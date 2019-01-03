(function (){
let select = document.querySelector('.teams-select');
let list = document.querySelector('.teams-list');
let icon = document.querySelector('.teams-select__item');
let teamList = document.querySelector('.list-view');
let selectImg = document.querySelector('#targetImg');
let selectName = document.querySelector('#targetName');
let infoMenu = document.querySelectorAll('.info-menu__item');
let teamSection = document.querySelectorAll('.team-section');


let allTeams = 0;

function showTeamList(){
    list.classList.toggle('teams-list-active');
    icon.classList.toggle('teams-select__item-active');
}
function renderTeamList(teamName){
    let li = document.createElement('li');
    li.classList.add('list-view__item');
    
    let wrap = document.createElement('div');
    wrap.classList.add('teams__link');

    // let img = document.createElement('img');
    // img.classList.add('teams__link-img');
    // img.setAttribute('href', '#');
    
    let name = document.createElement('h3');
    name.classList.add('teams__link-title');
    name.addEventListener('click', () => {
        console.log(event.target.innerHTML)
        selectName.innerHTML = event.target.innerHTML;
    });

    name.innerHTML = teamName;

    // wrap.appendChild(img);
    wrap.appendChild(name);
    li.appendChild(wrap);
    teamList.appendChild(li);
}
function setTeams() {

}

function chooseSection () {
    infoMenu.forEach((item) => {
        item.classList.remove('info-menu__item-active')
    });
    teamSection.forEach((item) => {
        item.classList.remove('team-section-active')
    });
    
    this.classList.add('info-menu__item-active');
    let name = this.getAttribute('data-name');
    teamSection.forEach((item) => {
        if(item.getAttribute('data-name') === name){
        item.classList.add('team-section-active');
        }
    });
}


infoMenu.forEach((item) => {
    item.addEventListener('click', chooseSection);
})
select.addEventListener('click', showTeamList);


fetch(`http://myvolley.ru/api/tournament?request=teams&id=384`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            allTeams = json;
            const formatedResult = [];

            json[0].map(item => {
                const {
                    teamName,
                }= item;

                formatedResult.push({
                    teamName
                });
            });
            return formatedResult;
        })
        .then(result => { 
            result.forEach(item => {
                renderTeamList(item.teamName);
            });
        });

})();