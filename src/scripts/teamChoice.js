(function (){
let select = document.querySelector('.teams-select');
let list = document.querySelector('.teams-list');
let icon = document.querySelector('.teams-select__item');
let teamList = document.querySelector('.list-view');
let selectImg = document.querySelector('#targetImg');
let selectName = document.querySelector('#targetName');
let infoMenu = document.querySelectorAll('.info-menu__item');
let teamSection = document.querySelectorAll('.team-section');
let playersList = document.querySelector('.players-list');



let allTeams = 0;

function showTeamList(){
    list.classList.toggle('teams-list-active');
    icon.classList.toggle('teams-select__item-active');
}
function renderTeamList(teamName, teamId){
    let li = document.createElement('li');
    li.classList.add('list-view__item');
    
    let wrap = document.createElement('div');
    wrap.classList.add('teams__link');

    // let img = document.createElement('img');
    // img.classList.add('teams__link-img');
    // img.setAttribute('href', '#');
    
    let name = document.createElement('h3');
    name.classList.add('teams__link-title');
    name.setAttribute('data-id', teamId)
    name.addEventListener('click', () => {
        console.log(event.target.innerHTML)
        selectName.innerHTML = event.target.innerHTML;
        let id = event.target.getAttribute('data-id');
        selectName.setAttribute('data-id', id);
        removePlayerCard();
        showPlayers();
    });

    name.innerHTML = teamName;

    // wrap.appendChild(img);
    wrap.appendChild(name);
    li.appendChild(wrap);
    teamList.appendChild(li);
}
function cat (str){
    return str.split(' '); 
}
function renderPlayerCard(name, birthday, height, number, photo){
    let card = document.createElement('div');
    card.classList.add('player-card');
    
    let img = document.createElement('img');
    img.classList.add('player-card__img');
    img.setAttribute('src', photo);
    
    let cardInfo = document.createElement('div');
    cardInfo.classList.add('player-card__info');
    
    let title = document.createElement('div');
    title.classList.add('card-title');
    
    let num = document.createElement('p');
    num.classList.add('card-info__number');
    num.innerHTML = number;

    let playerName = document.createElement('h3');
    playerName.classList.add('card-info__name');
    playerName.innerHTML = `${name[0]} ${name[1]}`;

    let birth = document.createElement('p');
    birth.classList.add('card-info__birth');
    birth.innerHTML = `<span>Дата рождения: </span> ${birthday}`;

    let playerHeight = document.createElement('p');
    playerHeight.classList.add('card-info__height');
    playerHeight.innerHTML = `<span>Рост: </span> ${height}`;

    let btn = document.createElement('div');
    btn.classList.add('card-info__profile');
    btn.innerHTML = 'подробнее';

    title.appendChild(num);
    title.appendChild(playerName);

    cardInfo.appendChild(title);
    cardInfo.appendChild(birth);
    cardInfo.appendChild(playerHeight);
    cardInfo.appendChild(btn);

    card.appendChild(img);
    card.appendChild(cardInfo);

    playersList.appendChild(card);
}
function removePlayerCard (){
    while (playersList.firstChild) {
        playersList.removeChild(playersList.firstChild);
}
}
function showPlayers() {
    let id = selectName.getAttribute('data-id');
    allTeams[0].forEach(item => {
        if(item.teamId == id){
            item.players.forEach(item => {
                renderPlayerCard(cat(item.playerName),
                                 item.birthday,
                                 item.height,
                                 item.number,
                                 item.photo)
            })
        }
    })

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
                    teamId
                }= item;

                formatedResult.push({
                    teamName,
                    teamId
                });
            });
            return formatedResult;
        })
        .then(result => { 
            result.forEach(item => {
                renderTeamList(item.teamName, item.teamId);
            });
        });

})();