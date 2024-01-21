const links = document.querySelectorAll('.nav-link')
const loading = document.querySelector('.loading')

document.addEventListener('load' , function(){
   loading.classList.remove('d-none')
})

for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {
        const active = document.querySelector('.active')
        active.classList.remove('active');
        e.target.classList.add('active')
    }
    )
}

import { DisplayGames } from './games.module.js'
let categouryData = new DisplayGames('mmorpg');
categouryData.function()



for (const cat of links) {
    cat.addEventListener('click', function () {
        const catValue = cat.innerHTML;
        categouryData.cate = catValue;
        categouryData.function()
    })
}


