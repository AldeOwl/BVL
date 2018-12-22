
let teams = {
    rus: {
        title: 'Russia',
        flag: 'images/rus.jpg'
    }
}

let country = document.querySelector('.teams__link-title');
let flag = document.querySelector('.teams__link-img');

country.innerHTML = teams.rus.title;
flag.setAttribute('src', teams.rus.flag);







